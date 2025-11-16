// ============================================
// Call Types
// ============================================

export interface CallRequest {
  id: string;
  caller_id: string;
  host_id: string;
  type: 'now' | 'reservation';
  status: 'pending' | 'accepted' | 'rejected' | 'canceled' | 'expired';
  requested_time_start: string | null;
  requested_time_end: string | null;
  responded_at: string | null;
  response_message: string | null;
  created_at: string;
}

export interface CallSession {
  id: string;
  request_id: string | null;
  caller_id: string;
  host_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  price_per_min: number;
  total_cost: number | null;
  status: 'active' | 'ended' | 'failed';
  created_at: string;
}

export interface Reservation {
  id: string;
  request_id: string;
  caller_id: string;
  host_id: string;
  reserved_time_start: string;
  reserved_time_end: string;
  status: 'scheduled' | 'completed' | 'canceled' | 'no_show';
  created_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  target_user_id: string;
  call_session_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}
