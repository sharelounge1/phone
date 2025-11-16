import { create } from 'zustand';
import type { Profile } from '../types/user';
import { profileService } from '../services/profileService';
import { pointService } from '../services/pointService';

interface UserState {
  profile: Profile | null;
  balance: number;
  loading: boolean;

  // Actions
  loadProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  loadBalance: () => Promise<void>;
  setBalance: (balance: number) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  balance: 0,
  loading: false,

  loadProfile: async () => {
    set({ loading: true });
    try {
      const profile = await profileService.getMyProfile();
      set({ profile, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateProfile: async (updates) => {
    const { profile } = get();
    if (!profile) throw new Error('No profile loaded');

    set({ loading: true });
    try {
      const updatedProfile = await profileService.updateProfile(profile.id, updates);
      set({ profile: updatedProfile, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  loadBalance: async () => {
    try {
      const balance = await pointService.getBalance();
      set({ balance });
    } catch (error) {
      console.error('Failed to load balance:', error);
    }
  },

  setBalance: (balance) => set({ balance }),
}));
