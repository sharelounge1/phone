import { supabase } from './supabase';
import type { Profile } from '../types/user';

export const profileService = {
  /**
   * 프로필 조회 (ID로)
   */
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data as Profile;
  },

  /**
   * 내 프로필 조회
   */
  async getMyProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    return this.getProfile(user.id);
  },

  /**
   * 프로필 업데이트
   */
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  },

  /**
   * 호스트 리스트 조회 (필터링)
   */
  async getHosts(filters?: {
    language?: string;
    interest?: string;
    minRating?: number;
    sortBy?: 'newest' | 'popular' | 'rating';
  }) {
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('is_host', true)
      .eq('host_status', 'approved');

    // 언어 필터
    if (filters?.language) {
      query = query.contains('languages', [filters.language]);
    }

    // 관심사 필터
    if (filters?.interest) {
      query = query.contains('interests', [filters.interest]);
    }

    // 최소 평점 필터
    if (filters?.minRating) {
      query = query.gte('average_rating', filters.minRating);
    }

    // 정렬
    if (filters?.sortBy === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (filters?.sortBy === 'popular') {
      query = query.order('total_calls', { ascending: false });
    } else if (filters?.sortBy === 'rating') {
      query = query.order('average_rating', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Profile[];
  },

  /**
   * 프로필 사진 업로드
   */
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  /**
   * 호스트 신청 사진 업로드
   */
  async uploadHostPhotos(userId: string, files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}_${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('host-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('host-photos')
        .getPublicUrl(fileName);

      urls.push(data.publicUrl);
    }

    return urls;
  },
};
