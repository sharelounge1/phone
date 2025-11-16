-- ============================================
-- FreeTalk Database Setup - Step 5
-- Storage 버킷 생성 및 정책
-- ============================================

-- ============================================
-- 1. avatars 버킷 생성 (프로필 사진)
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- avatars 버킷 정책
CREATE POLICY "avatars_select_policy"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "avatars_insert_policy"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_update_policy"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_delete_policy"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

-- ============================================
-- 2. host-photos 버킷 생성 (호스트 신청 사진)
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('host-photos', 'host-photos', true)
ON CONFLICT (id) DO NOTHING;

-- host-photos 버킷 정책
CREATE POLICY "host_photos_select_policy"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'host-photos');

CREATE POLICY "host_photos_insert_policy"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'host-photos' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

CREATE POLICY "host_photos_update_policy"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'host-photos' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );

CREATE POLICY "host_photos_delete_policy"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'host-photos' AND
    auth.uid()::TEXT = (storage.foldername(name))[1]
  );
