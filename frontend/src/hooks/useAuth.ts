import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';

export const useAuth = () => {
  const { user, loading, initialized, signIn, signUp, signOut, initialize } = useAuthStore();
  const { loadProfile, loadBalance } = useUserStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  useEffect(() => {
    if (user) {
      // 로그인 후 프로필 및 포인트 잔액 로드
      loadProfile();
      loadBalance();
    }
  }, [user, loadProfile, loadBalance]);

  return {
    user,
    loading,
    initialized,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };
};
