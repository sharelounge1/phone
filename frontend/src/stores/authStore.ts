import { create } from 'zustand';
import type { User } from '../types/user';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;

  // Actions
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nickname?: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  setUser: (user) => set({ user }),

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { user } = await authService.signIn(email, password);
      set({ user: user as User, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  signUp: async (email, password, nickname) => {
    set({ loading: true });
    try {
      const { user } = await authService.signUp(email, password, nickname);
      set({ user: user as User, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      await authService.signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  initialize: async () => {
    try {
      const user = await authService.getCurrentUser();
      set({ user, initialized: true });

      // 인증 상태 변화 구독
      authService.onAuthStateChange((user) => {
        set({ user });
      });
    } catch (error) {
      set({ initialized: true });
      console.error('Failed to initialize auth:', error);
    }
  },
}));
