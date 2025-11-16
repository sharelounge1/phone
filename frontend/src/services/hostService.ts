import { supabase } from './supabase';
import type { HostApplication } from '../types/user';

export const hostService = {
  /**
   * 호스트 신청
   */
  async applyAsHost(application: {
    gender: 'male' | 'female' | 'other';
    age: number;
    bankName: string;
    bankAccount: string;
    accountHolderName: string;
    photoUrls: string[];
    introText?: string;
    callPricePerMin: number;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('host_applications')
      .insert({
        user_id: user.id,
        gender: application.gender,
        age: application.age,
        bank_name: application.bankName,
        bank_account: application.bankAccount,
        account_holder_name: application.accountHolderName,
        photo_urls: application.photoUrls,
        intro_text: application.introText,
        call_price_per_min: application.callPricePerMin,
      })
      .select()
      .single();

    if (error) throw error;
    return data as HostApplication;
  },

  /**
   * 내 호스트 신청 상태 조회
   */
  async getMyApplication(): Promise<HostApplication | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('host_applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data as HostApplication | null;
  },

  /**
   * 호스트 신청 승인/반려 (관리자)
   */
  async approveApplication(applicationId: string, action: 'approve' | 'reject', reason?: string) {
    const { data, error } = await supabase.rpc('approve_host_application', {
      p_application_id: applicationId,
      p_action: action,
      p_rejection_reason: reason || null,
    });

    if (error) throw error;
    return data;
  },

  /**
   * 모든 호스트 신청 조회 (관리자)
   */
  async getAllApplications(status?: string): Promise<HostApplication[]> {
    let query = supabase
      .from('host_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as HostApplication[];
  },
};
