// ============================================
// Point Types
// ============================================

export interface PointWallet {
  id: string;
  user_id: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface PointTransaction {
  id: string;
  user_id: string;
  amount: number;
  balance_after: number;
  type: 'charge' | 'call_request' | 'call_fee' | 'earning' | 'refund' | 'withdrawal';
  description: string | null;
  related_id: string | null;
  created_at: string;
}

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  bank_name: string;
  bank_account: string;
  account_holder_name: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  processed_by: string | null;
  processed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
}
