# FreeTalk Database Setup Guide

Supabase 데이터베이스 설정 가이드입니다.

## 📋 실행 순서

### 1단계: Supabase 프로젝트 접속
1. https://supabase.com 로그인
2. 프로젝트 선택: `lfxsawapnfdzbasgezuf`
3. 좌측 메뉴에서 **SQL Editor** 클릭

---

### 2단계: Extensions 활성화
📄 파일: `migrations/01-enable-extensions.sql`

**SQL Editor에서 실행:**
```sql
-- UUID 생성을 위한 확장
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 텍스트 검색을 위한 확장 (호스트 검색용)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

✅ **확인:** 에러 없이 실행되면 성공

---

### 3단계: 테이블 생성
📄 파일: `migrations/02-create-tables.sql`

**SQL Editor에서 실행:**
- 전체 파일 내용을 복사하여 SQL Editor에 붙여넣기
- 실행 버튼 클릭

**생성되는 테이블:**
1. `profiles` - 유저 프로필
2. `point_wallets` - 포인트 지갑
3. `point_transactions` - 포인트 거래 내역
4. `call_requests` - 통화 요청
5. `call_sessions` - 통화 세션
6. `reviews` - 후기 및 평점
7. `reservations` - 확정된 예약
8. `host_applications` - 호스트 신청
9. `withdrawal_requests` - 출금 요청
10. `reports` - 신고
11. `blocks` - 차단

✅ **확인:**
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

---

### 4단계: Row Level Security (RLS) 정책 설정
📄 파일: `migrations/03-create-rls-policies.sql`

**SQL Editor에서 실행:**
- 전체 파일 내용을 복사하여 SQL Editor에 붙여넣기
- 실행 버튼 클릭

**설정되는 정책:**
- 본인 데이터만 수정 가능
- 통화 참여자만 세션 조회 가능
- 공개 데이터는 모두 조회 가능 (프로필, 후기 등)

✅ **확인:**
```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

---

### 5단계: RPC 함수 생성 (비즈니스 로직)
📄 파일: `migrations/04-create-rpc-functions.sql`

**SQL Editor에서 실행:**
- 전체 파일 내용을 복사하여 SQL Editor에 붙여넣기
- 실행 버튼 클릭

**생성되는 함수:**
1. `handle_new_user()` - 회원가입 시 프로필/지갑 자동 생성
2. `create_call_request()` - 통화 요청 생성 (200P 차감)
3. `respond_to_call_request()` - 통화 요청 수락/거절
4. `start_call_session()` - 통화 세션 시작
5. `end_call_session()` - 통화 세션 종료 및 정산
6. `charge_points()` - 포인트 충전
7. `request_withdrawal()` - 출금 신청
8. `approve_host_application()` - 호스트 신청 승인/반려
9. `update_average_rating()` - 평균 평점 자동 업데이트

✅ **확인:**
```sql
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
ORDER BY routine_name;
```

---

### 6단계: Storage 버킷 생성
📄 파일: `migrations/05-create-storage-buckets.sql`

**SQL Editor에서 실행:**
- 전체 파일 내용을 복사하여 SQL Editor에 붙여넣기
- 실행 버튼 클릭

**생성되는 버킷:**
1. `avatars` - 프로필 사진 (공개)
2. `host-photos` - 호스트 신청 사진 (공개)

✅ **확인:**
- 좌측 메뉴에서 **Storage** 클릭
- `avatars`, `host-photos` 버킷 확인

---

## 🧪 테스트 데이터 삽입 (선택)

### 테스트 유저 생성
Supabase Dashboard → Authentication → Users → Add User

**테스트 계정:**
- Email: `test@freetalk.com`
- Password: `test1234`

### 테스트 호스트 프로필 생성
```sql
-- 먼저 위에서 만든 유저의 ID 확인
SELECT id, email FROM auth.users WHERE email = 'test@freetalk.com';

-- 프로필 업데이트 (호스트로 설정)
UPDATE profiles
SET
  nickname = '테스트 호스트',
  age = 25,
  gender = 'female',
  intro_text = '안녕하세요! 재미있는 대화 나눠요 😊',
  languages = ARRAY['korean', 'english'],
  interests = ARRAY['영화', '여행', '음악'],
  is_host = true,
  host_status = 'approved',
  call_price_per_min = 300,
  average_rating = 4.8
WHERE email = 'test@freetalk.com';

-- 포인트 충전 (테스트용)
UPDATE point_wallets
SET balance = 10000
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'test@freetalk.com');
```

---

## 🔍 데이터 확인 쿼리

### 전체 프로필 확인
```sql
SELECT id, nickname, email, is_host, host_status, call_price_per_min, average_rating
FROM profiles
ORDER BY created_at DESC;
```

### 포인트 잔액 확인
```sql
SELECT p.nickname, pw.balance
FROM point_wallets pw
JOIN profiles p ON p.id = pw.user_id
ORDER BY pw.balance DESC;
```

### 통화 요청 확인
```sql
SELECT
  cr.id,
  cp.nickname AS caller,
  hp.nickname AS host,
  cr.type,
  cr.status,
  cr.created_at
FROM call_requests cr
JOIN profiles cp ON cp.id = cr.caller_id
JOIN profiles hp ON hp.id = cr.host_id
ORDER BY cr.created_at DESC;
```

---

## ⚠️ 주의사항

1. **순서 준수**: 반드시 01 → 02 → 03 → 04 → 05 순서로 실행
2. **에러 확인**: 각 단계마다 에러가 없는지 확인 후 다음 단계 진행
3. **권한 문제**: RLS 정책으로 인해 관리자 계정도 일부 데이터 직접 수정 불가 (RPC 함수 사용 필요)
4. **Storage 정책**: 파일 업로드 시 `{user_id}/filename.jpg` 형태로 경로 지정

---

## 🎯 다음 단계

데이터베이스 설정이 완료되면:
1. 프론트엔드에서 Supabase 클라이언트 설정
2. API 서비스 파일 작성
3. Mock 데이터를 실제 API로 교체

---

## 📞 문제 해결

### 에러: "permission denied for schema public"
→ Supabase Dashboard에서 Database 권한 확인

### 에러: "relation does not exist"
→ 테이블 생성 단계(02-create-tables.sql)가 제대로 실행되었는지 확인

### 에러: "extension does not exist"
→ Extensions 활성화 단계(01-enable-extensions.sql) 먼저 실행

---

**작성일:** 2025-11-16
**버전:** 1.0.0
