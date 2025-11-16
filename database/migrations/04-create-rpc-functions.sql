-- ============================================
-- FreeTalk Database Setup - Step 4
-- RPC 함수 (비즈니스 로직)
-- ============================================

-- ============================================
-- 1. 회원가입 시 프로필 및 포인트 지갑 생성
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- profiles 테이블에 기본 프로필 생성
  INSERT INTO public.profiles (id, email, nickname)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nickname', SPLIT_PART(NEW.email, '@', 1))
  );

  -- point_wallets 테이블에 지갑 생성
  INSERT INTO public.point_wallets (user_id, balance)
  VALUES (NEW.id, 0);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- auth.users 테이블에 트리거 추가
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 2. 통화 요청 생성 (200P 차감)
-- ============================================
CREATE OR REPLACE FUNCTION create_call_request(
  p_host_id UUID,
  p_type VARCHAR,
  p_requested_time_start TIMESTAMPTZ DEFAULT NULL,
  p_requested_time_end TIMESTAMPTZ DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  v_caller_id UUID;
  v_wallet_balance INTEGER;
  v_request_id UUID;
  v_request_cost INTEGER := 200; -- 통화 요청 비용
BEGIN
  -- 현재 사용자 ID 가져오기
  v_caller_id := auth.uid();

  IF v_caller_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- 포인트 잔액 확인
  SELECT balance INTO v_wallet_balance
  FROM point_wallets
  WHERE user_id = v_caller_id
  FOR UPDATE;

  IF v_wallet_balance < v_request_cost THEN
    RAISE EXCEPTION 'insufficient_points: 보유 %P, 필요 %P', v_wallet_balance, v_request_cost;
  END IF;

  -- 포인트 차감
  UPDATE point_wallets
  SET balance = balance - v_request_cost
  WHERE user_id = v_caller_id;

  -- 통화 요청 생성
  INSERT INTO call_requests (caller_id, host_id, type, requested_time_start, requested_time_end)
  VALUES (v_caller_id, p_host_id, p_type, p_requested_time_start, p_requested_time_end)
  RETURNING id INTO v_request_id;

  -- 포인트 거래 내역 기록
  INSERT INTO point_transactions (user_id, amount, balance_after, type, description, related_id)
  VALUES (
    v_caller_id,
    -v_request_cost,
    v_wallet_balance - v_request_cost,
    'call_request',
    '통화 요청 비용',
    v_request_id
  );

  RETURN json_build_object(
    'request_id', v_request_id,
    'points_deducted', v_request_cost,
    'remaining_balance', v_wallet_balance - v_request_cost
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3. 통화 요청 응답 (수락/거절)
-- ============================================
CREATE OR REPLACE FUNCTION respond_to_call_request(
  p_request_id UUID,
  p_action VARCHAR, -- 'accept' or 'reject'
  p_reserved_start TIMESTAMPTZ DEFAULT NULL,
  p_reserved_end TIMESTAMPTZ DEFAULT NULL,
  p_response_message TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  v_host_id UUID;
  v_request RECORD;
  v_reservation_id UUID;
BEGIN
  v_host_id := auth.uid();

  IF v_host_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- 통화 요청 조회
  SELECT * INTO v_request
  FROM call_requests
  WHERE id = p_request_id AND host_id = v_host_id AND status = 'pending'
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Request not found or already responded';
  END IF;

  IF p_action = 'accept' THEN
    -- 통화 요청 수락
    UPDATE call_requests
    SET status = 'accepted', responded_at = NOW(), response_message = p_response_message
    WHERE id = p_request_id;

    -- 예약인 경우 reservations 테이블에 추가
    IF v_request.type = 'reservation' THEN
      INSERT INTO reservations (request_id, caller_id, host_id, reserved_time_start, reserved_time_end)
      VALUES (p_request_id, v_request.caller_id, v_host_id, p_reserved_start, p_reserved_end)
      RETURNING id INTO v_reservation_id;

      RETURN json_build_object(
        'status', 'accepted',
        'reservation_id', v_reservation_id,
        'reserved_time_start', p_reserved_start,
        'reserved_time_end', p_reserved_end
      );
    ELSE
      RETURN json_build_object('status', 'accepted', 'type', 'now');
    END IF;

  ELSIF p_action = 'reject' THEN
    -- 통화 요청 거절
    UPDATE call_requests
    SET status = 'rejected', responded_at = NOW(), response_message = p_response_message
    WHERE id = p_request_id;

    -- 포인트 환불 (200P)
    UPDATE point_wallets
    SET balance = balance + 200
    WHERE user_id = v_request.caller_id;

    -- 환불 거래 내역 기록
    INSERT INTO point_transactions (user_id, amount, balance_after, type, description, related_id)
    SELECT v_request.caller_id, 200, balance, 'refund', '통화 요청 거절 환불', p_request_id
    FROM point_wallets
    WHERE user_id = v_request.caller_id;

    RETURN json_build_object('status', 'rejected', 'refunded', 200);
  ELSE
    RAISE EXCEPTION 'Invalid action';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. 통화 세션 시작
-- ============================================
CREATE OR REPLACE FUNCTION start_call_session(
  p_request_id UUID
)
RETURNS JSON AS $$
DECLARE
  v_request RECORD;
  v_session_id UUID;
  v_host_price INTEGER;
BEGIN
  -- 통화 요청 조회
  SELECT cr.*, p.call_price_per_min
  INTO v_request
  FROM call_requests cr
  JOIN profiles p ON p.id = cr.host_id
  WHERE cr.id = p_request_id AND cr.status = 'accepted'
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Request not found or not accepted';
  END IF;

  v_host_price := v_request.call_price_per_min;

  -- 통화 세션 생성
  INSERT INTO call_sessions (request_id, caller_id, host_id, price_per_min, status)
  VALUES (p_request_id, v_request.caller_id, v_request.host_id, v_host_price, 'active')
  RETURNING id INTO v_session_id;

  RETURN json_build_object(
    'session_id', v_session_id,
    'caller_id', v_request.caller_id,
    'host_id', v_request.host_id,
    'price_per_min', v_host_price,
    'started_at', NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. 통화 세션 종료 및 포인트 정산
-- ============================================
CREATE OR REPLACE FUNCTION end_call_session(
  p_session_id UUID
)
RETURNS JSON AS $$
DECLARE
  v_session RECORD;
  v_duration_seconds INTEGER;
  v_total_cost INTEGER;
  v_caller_balance INTEGER;
  v_host_balance INTEGER;
BEGIN
  -- 통화 세션 조회
  SELECT * INTO v_session
  FROM call_sessions
  WHERE id = p_session_id AND status = 'active'
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Session not found or already ended';
  END IF;

  -- 통화 시간 계산 (초 단위)
  v_duration_seconds := EXTRACT(EPOCH FROM (NOW() - v_session.started_at))::INTEGER;

  -- 총 비용 계산 (초 단위로 계산 후 포인트 환산)
  v_total_cost := CEIL(v_duration_seconds / 60.0) * v_session.price_per_min;

  -- caller 포인트 확인
  SELECT balance INTO v_caller_balance
  FROM point_wallets
  WHERE user_id = v_session.caller_id
  FOR UPDATE;

  -- 포인트 부족 시 보유한 만큼만 차감
  IF v_caller_balance < v_total_cost THEN
    v_total_cost := v_caller_balance;
  END IF;

  -- caller 포인트 차감
  UPDATE point_wallets
  SET balance = balance - v_total_cost
  WHERE user_id = v_session.caller_id
  RETURNING balance INTO v_caller_balance;

  -- host 포인트 적립
  UPDATE point_wallets
  SET balance = balance + v_total_cost
  WHERE user_id = v_session.host_id
  RETURNING balance INTO v_host_balance;

  -- 통화 세션 업데이트
  UPDATE call_sessions
  SET ended_at = NOW(),
      duration_seconds = v_duration_seconds,
      total_cost = v_total_cost,
      status = 'ended'
  WHERE id = p_session_id;

  -- caller 거래 내역 기록
  INSERT INTO point_transactions (user_id, amount, balance_after, type, description, related_id)
  VALUES (
    v_session.caller_id,
    -v_total_cost,
    v_caller_balance,
    'call_fee',
    FORMAT('통화 요금 (%s초)', v_duration_seconds),
    p_session_id
  );

  -- host 거래 내역 기록
  INSERT INTO point_transactions (user_id, amount, balance_after, type, description, related_id)
  VALUES (
    v_session.host_id,
    v_total_cost,
    v_host_balance,
    'earning',
    FORMAT('통화 수익 (%s초)', v_duration_seconds),
    p_session_id
  );

  -- host 통계 업데이트
  UPDATE profiles
  SET total_calls = total_calls + 1,
      total_earnings = total_earnings + v_total_cost
  WHERE id = v_session.host_id;

  RETURN json_build_object(
    'session_id', p_session_id,
    'duration_seconds', v_duration_seconds,
    'total_cost', v_total_cost,
    'caller_balance', v_caller_balance,
    'host_balance', v_host_balance,
    'ended_at', NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 6. 포인트 충전 (결제 완료 후 호출)
-- ============================================
CREATE OR REPLACE FUNCTION charge_points(
  p_user_id UUID,
  p_amount_krw INTEGER,
  p_payment_gateway_id TEXT
)
RETURNS JSON AS $$
DECLARE
  v_points_added INTEGER;
  v_new_balance INTEGER;
BEGIN
  -- 포인트 계산 (보너스 포함)
  v_points_added := CASE
    WHEN p_amount_krw = 10000 THEN 10000
    WHEN p_amount_krw = 30000 THEN 40000  -- 33% 보너스
    WHEN p_amount_krw = 100000 THEN 150000 -- 50% 보너스
    ELSE p_amount_krw -- 기본 1:1
  END;

  -- 포인트 추가
  UPDATE point_wallets
  SET balance = balance + v_points_added
  WHERE user_id = p_user_id
  RETURNING balance INTO v_new_balance;

  -- 거래 내역 기록
  INSERT INTO point_transactions (user_id, amount, balance_after, type, description, related_id)
  VALUES (
    p_user_id,
    v_points_added,
    v_new_balance,
    'charge',
    FORMAT('포인트 충전 (₩%s)', p_amount_krw),
    NULL
  );

  RETURN json_build_object(
    'points_added', v_points_added,
    'new_balance', v_new_balance,
    'payment_id', p_payment_gateway_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 7. 출금 신청
-- ============================================
CREATE OR REPLACE FUNCTION request_withdrawal(
  p_amount INTEGER,
  p_bank_name VARCHAR,
  p_bank_account VARCHAR,
  p_account_holder_name VARCHAR
)
RETURNS JSON AS $$
DECLARE
  v_user_id UUID;
  v_balance INTEGER;
  v_request_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- 1만원 단위 체크
  IF p_amount % 10000 != 0 THEN
    RAISE EXCEPTION '출금은 1만원 단위로만 가능합니다';
  END IF;

  -- 포인트 잔액 확인
  SELECT balance INTO v_balance
  FROM point_wallets
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF v_balance < p_amount THEN
    RAISE EXCEPTION 'insufficient_balance: 보유 %P, 출금 요청 %P', v_balance, p_amount;
  END IF;

  -- 포인트 차감
  UPDATE point_wallets
  SET balance = balance - p_amount
  WHERE user_id = v_user_id;

  -- 출금 요청 생성
  INSERT INTO withdrawal_requests (user_id, amount, bank_name, bank_account, account_holder_name)
  VALUES (v_user_id, p_amount, p_bank_name, p_bank_account, p_account_holder_name)
  RETURNING id INTO v_request_id;

  -- 거래 내역 기록
  INSERT INTO point_transactions (user_id, amount, balance_after, type, description, related_id)
  VALUES (
    v_user_id,
    -p_amount,
    v_balance - p_amount,
    'withdrawal',
    FORMAT('출금 신청 (%s %s)', p_bank_name, p_bank_account),
    v_request_id
  );

  RETURN json_build_object(
    'request_id', v_request_id,
    'amount', p_amount,
    'remaining_balance', v_balance - p_amount
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 8. 호스트 신청 승인/반려 (관리자)
-- ============================================
CREATE OR REPLACE FUNCTION approve_host_application(
  p_application_id UUID,
  p_action VARCHAR, -- 'approve' or 'reject'
  p_rejection_reason TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  v_admin_id UUID;
  v_application RECORD;
BEGIN
  v_admin_id := auth.uid();

  -- TODO: 관리자 권한 체크 (별도 admins 테이블 또는 profiles.is_admin 필드 필요)

  -- 신청 조회
  SELECT * INTO v_application
  FROM host_applications
  WHERE id = p_application_id AND status = 'pending'
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found or already reviewed';
  END IF;

  IF p_action = 'approve' THEN
    -- 신청 승인
    UPDATE host_applications
    SET status = 'approved',
        reviewed_by = v_admin_id,
        reviewed_at = NOW()
    WHERE id = p_application_id;

    -- 프로필 업데이트 (호스트로 전환)
    UPDATE profiles
    SET is_host = TRUE,
        host_status = 'approved',
        host_approved_at = NOW(),
        call_price_per_min = v_application.call_price_per_min,
        gender = v_application.gender,
        age = v_application.age
    WHERE id = v_application.user_id;

    RETURN json_build_object('status', 'approved', 'user_id', v_application.user_id);

  ELSIF p_action = 'reject' THEN
    -- 신청 반려
    UPDATE host_applications
    SET status = 'rejected',
        reviewed_by = v_admin_id,
        reviewed_at = NOW(),
        rejection_reason = p_rejection_reason
    WHERE id = p_application_id;

    -- 프로필 업데이트
    UPDATE profiles
    SET host_status = 'rejected'
    WHERE id = v_application.user_id;

    RETURN json_build_object('status', 'rejected', 'reason', p_rejection_reason);

  ELSE
    RAISE EXCEPTION 'Invalid action';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 9. 후기 작성 후 평균 평점 업데이트
-- ============================================
CREATE OR REPLACE FUNCTION update_average_rating()
RETURNS TRIGGER AS $$
DECLARE
  v_avg_rating DECIMAL(3,2);
BEGIN
  -- 대상 사용자의 평균 평점 계산
  SELECT ROUND(AVG(rating)::NUMERIC, 2) INTO v_avg_rating
  FROM reviews
  WHERE target_user_id = NEW.target_user_id;

  -- 프로필 업데이트
  UPDATE profiles
  SET average_rating = v_avg_rating
  WHERE id = NEW.target_user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- reviews 테이블에 트리거 추가
CREATE TRIGGER after_review_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_average_rating();
