import { supabase } from './supabase';
import type { CallRequest, CallSession, Reservation, Review } from '../types/call';

export const callService = {
  /**
   * 통화 요청 생성 (200P 차감)
   */
  async createCallRequest(
    hostId: string,
    type: 'now' | 'reservation',
    timeRange?: { start: string; end: string }
  ) {
    const { data, error } = await supabase.rpc('create_call_request', {
      p_host_id: hostId,
      p_type: type,
      p_requested_time_start: timeRange?.start || null,
      p_requested_time_end: timeRange?.end || null,
    });

    if (error) throw error;
    return data;
  },

  /**
   * 통화 요청 응답 (수락/거절)
   */
  async respondToCallRequest(
    requestId: string,
    action: 'accept' | 'reject',
    reservedTime?: { start: string; end: string },
    message?: string
  ) {
    const { data, error } = await supabase.rpc('respond_to_call_request', {
      p_request_id: requestId,
      p_action: action,
      p_reserved_start: reservedTime?.start || null,
      p_reserved_end: reservedTime?.end || null,
      p_response_message: message || null,
    });

    if (error) throw error;
    return data;
  },

  /**
   * 통화 세션 시작
   */
  async startCallSession(requestId: string) {
    const { data, error } = await supabase.rpc('start_call_session', {
      p_request_id: requestId,
    });

    if (error) throw error;
    return data;
  },

  /**
   * 통화 세션 종료 및 포인트 정산
   */
  async endCallSession(sessionId: string) {
    const { data, error } = await supabase.rpc('end_call_session', {
      p_session_id: sessionId,
    });

    if (error) throw error;
    return data;
  },

  /**
   * 내가 받은 통화 요청 리스트 (호스트)
   */
  async getMyCallRequests(status?: string): Promise<CallRequest[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    let query = supabase
      .from('call_requests')
      .select('*')
      .eq('host_id', user.id)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as CallRequest[];
  },

  /**
   * 내가 보낸 통화 요청 리스트 (게스트)
   */
  async getMySentRequests(): Promise<CallRequest[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('call_requests')
      .select('*')
      .eq('caller_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CallRequest[];
  },

  /**
   * 통화 히스토리 조회
   */
  async getCallHistory(): Promise<CallSession[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('call_sessions')
      .select('*')
      .or(`caller_id.eq.${user.id},host_id.eq.${user.id}`)
      .eq('status', 'ended')
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data as CallSession[];
  },

  /**
   * 예약 리스트 조회
   */
  async getReservations(status?: string): Promise<Reservation[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    let query = supabase
      .from('reservations')
      .select('*')
      .or(`caller_id.eq.${user.id},host_id.eq.${user.id}`)
      .order('reserved_time_start', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Reservation[];
  },

  /**
   * 후기 작성
   */
  async createReview(
    targetUserId: string,
    callSessionId: string,
    rating: number,
    comment?: string
  ) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        reviewer_id: user.id,
        target_user_id: targetUserId,
        call_session_id: callSessionId,
        rating,
        comment,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Review;
  },

  /**
   * 호스트 후기 조회
   */
  async getHostReviews(hostId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('target_user_id', hostId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Review[];
  },
};
