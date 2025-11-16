-- ============================================
-- FreeTalk Database Setup - Step 3
-- Row Level Security (RLS) 정책
-- ============================================

-- ============================================
-- 1. profiles 테이블 RLS
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 모든 사용자는 다른 사용자의 프로필 조회 가능
CREATE POLICY "profiles_select_policy"
  ON profiles FOR SELECT
  USING (true);

-- 본인 프로필만 수정 가능
CREATE POLICY "profiles_update_policy"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 회원가입 시 프로필 생성 가능
CREATE POLICY "profiles_insert_policy"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. point_wallets 테이블 RLS
-- ============================================
ALTER TABLE point_wallets ENABLE ROW LEVEL SECURITY;

-- 본인 지갑만 조회 가능
CREATE POLICY "point_wallets_select_policy"
  ON point_wallets FOR SELECT
  USING (auth.uid() = user_id);

-- 회원가입 시 지갑 생성 (트리거로 자동 생성하므로 INSERT는 서버에서만)
CREATE POLICY "point_wallets_insert_policy"
  ON point_wallets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 3. point_transactions 테이블 RLS
-- ============================================
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- 본인 거래 내역만 조회 가능
CREATE POLICY "point_transactions_select_policy"
  ON point_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT는 RPC 함수에서만 수행

-- ============================================
-- 4. call_requests 테이블 RLS
-- ============================================
ALTER TABLE call_requests ENABLE ROW LEVEL SECURITY;

-- caller 또는 host만 조회 가능
CREATE POLICY "call_requests_select_policy"
  ON call_requests FOR SELECT
  USING (auth.uid() = caller_id OR auth.uid() = host_id);

-- caller만 생성 가능 (본인이 caller인 경우)
CREATE POLICY "call_requests_insert_policy"
  ON call_requests FOR INSERT
  WITH CHECK (auth.uid() = caller_id);

-- host만 상태 업데이트 가능 (accept/reject)
CREATE POLICY "call_requests_update_policy"
  ON call_requests FOR UPDATE
  USING (auth.uid() = host_id OR auth.uid() = caller_id);

-- ============================================
-- 5. call_sessions 테이블 RLS
-- ============================================
ALTER TABLE call_sessions ENABLE ROW LEVEL SECURITY;

-- caller 또는 host만 조회 가능
CREATE POLICY "call_sessions_select_policy"
  ON call_sessions FOR SELECT
  USING (auth.uid() = caller_id OR auth.uid() = host_id);

-- INSERT/UPDATE는 RPC 함수에서만

-- ============================================
-- 6. reviews 테이블 RLS
-- ============================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 모든 사용자는 호스트의 후기 조회 가능
CREATE POLICY "reviews_select_policy"
  ON reviews FOR SELECT
  USING (true);

-- 본인이 작성한 후기만 수정 가능
CREATE POLICY "reviews_insert_policy"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "reviews_update_policy"
  ON reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

-- ============================================
-- 7. reservations 테이블 RLS
-- ============================================
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- caller 또는 host만 조회 가능
CREATE POLICY "reservations_select_policy"
  ON reservations FOR SELECT
  USING (auth.uid() = caller_id OR auth.uid() = host_id);

-- INSERT/UPDATE는 RPC 함수에서만

-- ============================================
-- 8. host_applications 테이블 RLS
-- ============================================
ALTER TABLE host_applications ENABLE ROW LEVEL SECURITY;

-- 본인 신청만 조회 가능
CREATE POLICY "host_applications_select_policy"
  ON host_applications FOR SELECT
  USING (auth.uid() = user_id);

-- 본인이 신청 가능
CREATE POLICY "host_applications_insert_policy"
  ON host_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 9. withdrawal_requests 테이블 RLS
-- ============================================
ALTER TABLE withdrawal_requests ENABLE ROW LEVEL SECURITY;

-- 본인 출금 요청만 조회 가능
CREATE POLICY "withdrawal_requests_select_policy"
  ON withdrawal_requests FOR SELECT
  USING (auth.uid() = user_id);

-- 본인이 출금 요청 가능
CREATE POLICY "withdrawal_requests_insert_policy"
  ON withdrawal_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 10. reports 테이블 RLS
-- ============================================
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- 본인이 작성한 신고만 조회 가능
CREATE POLICY "reports_select_policy"
  ON reports FOR SELECT
  USING (auth.uid() = reporter_id);

-- 본인이 신고 작성 가능
CREATE POLICY "reports_insert_policy"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

-- ============================================
-- 11. blocks 테이블 RLS
-- ============================================
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- 본인이 차단한 목록만 조회 가능
CREATE POLICY "blocks_select_policy"
  ON blocks FOR SELECT
  USING (auth.uid() = blocker_id);

-- 본인이 차단 가능
CREATE POLICY "blocks_insert_policy"
  ON blocks FOR INSERT
  WITH CHECK (auth.uid() = blocker_id);

-- 본인이 차단 해제 가능
CREATE POLICY "blocks_delete_policy"
  ON blocks FOR DELETE
  USING (auth.uid() = blocker_id);
