import { supabase } from './supabase';
import type { PointWallet, PointTransaction, WithdrawalRequest } from '../types/point';

export const pointService = {
  /**
   * 포인트 잔액 조회
   */
  async getBalance(): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('point_wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data?.balance || 0;
  },

  /**
   * 포인트 지갑 전체 조회
   */
  async getWallet(): Promise<PointWallet | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('point_wallets')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as PointWallet;
  },

  /**
   * 포인트 충전 (결제 완료 후 호출)
   */
  async chargePoints(amountKrw: number, paymentGatewayId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase.rpc('charge_points', {
      p_user_id: user.id,
      p_amount_krw: amountKrw,
      p_payment_gateway_id: paymentGatewayId,
    });

    if (error) throw error;
    return data;
  },

  /**
   * 포인트 거래 내역 조회
   */
  async getTransactions(type?: string): Promise<PointTransaction[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    let query = supabase
      .from('point_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as PointTransaction[];
  },

  /**
   * 출금 신청
   */
  async requestWithdrawal(
    amount: number,
    bankName: string,
    bankAccount: string,
    accountHolderName: string
  ) {
    const { data, error } = await supabase.rpc('request_withdrawal', {
      p_amount: amount,
      p_bank_name: bankName,
      p_bank_account: bankAccount,
      p_account_holder_name: accountHolderName,
    });

    if (error) throw error;
    return data;
  },

  /**
   * 출금 요청 내역 조회
   */
  async getWithdrawalRequests(): Promise<WithdrawalRequest[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as WithdrawalRequest[];
  },

  /**
   * 포인트 잔액 실시간 구독
   */
  subscribeToBalance(userId: string, callback: (balance: number) => void) {
    return supabase
      .channel(`point_wallet:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'point_wallets',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback((payload.new as PointWallet).balance);
        }
      )
      .subscribe();
  },
};
