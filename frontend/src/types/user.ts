// ============================================
// User & Profile Types
// ============================================

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  nickname: string;
  email: string;
  age: number | null;
  gender: 'male' | 'female' | 'other' | null;
  intro_text: string | null;
  languages: string[];
  interests: string[];
  avatar_url: string | null;

  // 호스트 관련
  is_host: boolean;
  host_status: 'none' | 'pending' | 'approved' | 'rejected' | 'suspended';
  call_price_per_min: number;
  host_approved_at: string | null;

  // 통계
  total_calls: number;
  total_earnings: number;
  average_rating: number;

  // 메타데이터
  created_at: string;
  updated_at: string;
}

export interface HostApplication {
  id: string;
  user_id: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  bank_name: string;
  bank_account: string;
  account_holder_name: string;
  photo_urls: string[];
  intro_text: string | null;
  call_price_per_min: number;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
}
