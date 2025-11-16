import { supabase } from './supabase';
import type { User } from '../types/user';

export const authService = {
  /**
   * 이메일 + 비밀번호로 회원가입
   */
  async signUp(email: string, password: string, nickname?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: nickname || email.split('@')[0],
        },
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * 이메일 + 비밀번호로 로그인
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * SNS 로그인 (카카오, 구글 등)
   */
  async signInWithOAuth(provider: 'kakao' | 'google' | 'apple') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * 로그아웃
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * 현재 로그인한 사용자 정보 가져오기
   */
  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user as User | null;
  },

  /**
   * 현재 세션 가져오기
   */
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * 인증 상태 변화 구독
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user as User | null);
    });
  },
};
