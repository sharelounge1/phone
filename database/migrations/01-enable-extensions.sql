-- ============================================
-- FreeTalk Database Setup - Step 1
-- Extensions 활성화
-- ============================================

-- UUID 생성을 위한 확장
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 텍스트 검색을 위한 확장 (호스트 검색용)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
