-- ============================================
-- FreeTalk Database Setup - Step 2
-- 테이블 생성
-- ============================================

-- ============================================
-- 1. profiles 테이블 (유저 프로필)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  age INTEGER,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  intro_text TEXT,
  languages TEXT[], -- ['korean', 'english', 'japanese']
  interests TEXT[], -- ['영화', '여행', '음악']
  avatar_url TEXT,

  -- 호스트 관련 필드
  is_host BOOLEAN DEFAULT FALSE,
  host_status VARCHAR(20) DEFAULT 'none' CHECK (host_status IN ('none', 'pending', 'approved', 'rejected', 'suspended')),
  call_price_per_min INTEGER DEFAULT 0, -- 분당 요금 (포인트)
  host_approved_at TIMESTAMPTZ,

  -- 통계
  total_calls INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0, -- 총 수익 (포인트)
  average_rating DECIMAL(3,2) DEFAULT 0.00,

  -- 메타데이터
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. point_wallets 테이블 (포인트 지갑)
-- ============================================
CREATE TABLE IF NOT EXISTS point_wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0 CHECK (balance >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

-- ============================================
-- 3. point_transactions 테이블 (포인트 거래 내역)
-- ============================================
CREATE TABLE IF NOT EXISTS point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- 양수: 충전/적립, 음수: 차감
  balance_after INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('charge', 'call_request', 'call_fee', 'earning', 'refund', 'withdrawal')),
  description TEXT,
  related_id UUID, -- call_session_id, payment_id 등
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX idx_point_transactions_created_at ON point_transactions(created_at DESC);

-- ============================================
-- 4. call_requests 테이블 (통화 요청)
-- ============================================
CREATE TABLE IF NOT EXISTS call_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('now', 'reservation')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'canceled', 'expired')),

  -- 예약 정보 (type='reservation'인 경우)
  requested_time_start TIMESTAMPTZ,
  requested_time_end TIMESTAMPTZ,

  -- 응답 정보
  responded_at TIMESTAMPTZ,
  response_message TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  CHECK (
    (type = 'now' AND requested_time_start IS NULL AND requested_time_end IS NULL) OR
    (type = 'reservation' AND requested_time_start IS NOT NULL AND requested_time_end IS NOT NULL)
  )
);

CREATE INDEX idx_call_requests_caller_id ON call_requests(caller_id);
CREATE INDEX idx_call_requests_host_id ON call_requests(host_id);
CREATE INDEX idx_call_requests_status ON call_requests(status);

-- ============================================
-- 5. call_sessions 테이블 (통화 세션)
-- ============================================
CREATE TABLE IF NOT EXISTS call_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES call_requests(id) ON DELETE SET NULL,
  caller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- 통화 시간
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,

  -- 요금 정보
  price_per_min INTEGER NOT NULL, -- 통화 시작 시점의 분당 요금
  total_cost INTEGER, -- 총 통화 요금 (duration_seconds / 60 * price_per_min)

  -- 상태
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'ended', 'failed')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_call_sessions_caller_id ON call_sessions(caller_id);
CREATE INDEX idx_call_sessions_host_id ON call_sessions(host_id);
CREATE INDEX idx_call_sessions_started_at ON call_sessions(started_at DESC);

-- ============================================
-- 6. reviews 테이블 (후기 및 평점)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  call_session_id UUID REFERENCES call_sessions(id) ON DELETE SET NULL,

  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 한 세션당 한 번만 후기 작성 가능
  UNIQUE(reviewer_id, call_session_id)
);

CREATE INDEX idx_reviews_target_user_id ON reviews(target_user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- ============================================
-- 7. reservations 테이블 (확정된 예약)
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES call_requests(id) ON DELETE CASCADE,
  caller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  reserved_time_start TIMESTAMPTZ NOT NULL,
  reserved_time_end TIMESTAMPTZ NOT NULL,

  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'canceled', 'no_show')),

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(request_id)
);

CREATE INDEX idx_reservations_caller_id ON reservations(caller_id);
CREATE INDEX idx_reservations_host_id ON reservations(host_id);
CREATE INDEX idx_reservations_reserved_time ON reservations(reserved_time_start);

-- ============================================
-- 8. host_applications 테이블 (호스트 신청)
-- ============================================
CREATE TABLE IF NOT EXISTS host_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- 신청 정보
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  age INTEGER NOT NULL CHECK (age >= 18),
  bank_name VARCHAR(50) NOT NULL,
  bank_account VARCHAR(50) NOT NULL,
  account_holder_name VARCHAR(50) NOT NULL,

  photo_urls TEXT[] NOT NULL, -- 최소 3장

  intro_text TEXT,
  call_price_per_min INTEGER NOT NULL CHECK (call_price_per_min >= 100), -- 최소 100P

  -- 승인 정보
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  CHECK (array_length(photo_urls, 1) >= 3)
);

CREATE INDEX idx_host_applications_user_id ON host_applications(user_id);
CREATE INDEX idx_host_applications_status ON host_applications(status);

-- ============================================
-- 9. withdrawal_requests 테이블 (출금 요청)
-- ============================================
CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  amount INTEGER NOT NULL CHECK (amount > 0 AND amount % 10000 = 0), -- 1만원 단위
  bank_name VARCHAR(50) NOT NULL,
  bank_account VARCHAR(50) NOT NULL,
  account_holder_name VARCHAR(50) NOT NULL,

  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed', 'rejected')),

  processed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  processed_at TIMESTAMPTZ,
  rejection_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_withdrawal_requests_user_id ON withdrawal_requests(user_id);
CREATE INDEX idx_withdrawal_requests_status ON withdrawal_requests(status);

-- ============================================
-- 10. reports 테이블 (신고)
-- ============================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  call_session_id UUID REFERENCES call_sessions(id) ON DELETE SET NULL,

  reason VARCHAR(50) NOT NULL CHECK (reason IN ('inappropriate', 'harassment', 'scam', 'other')),
  description TEXT,

  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'action_taken', 'dismissed')),

  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  admin_note TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_reported_user_id ON reports(reported_user_id);
CREATE INDEX idx_reports_status ON reports(status);

-- ============================================
-- 11. blocks 테이블 (차단)
-- ============================================
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(blocker_id, blocked_user_id),
  CHECK (blocker_id != blocked_user_id)
);

CREATE INDEX idx_blocks_blocker_id ON blocks(blocker_id);

-- ============================================
-- Updated_at 자동 업데이트 함수
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- profiles 테이블에 트리거 추가
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- point_wallets 테이블에 트리거 추가
CREATE TRIGGER update_point_wallets_updated_at
  BEFORE UPDATE ON point_wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
