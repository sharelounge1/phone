import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Calendar, X, Check } from 'lucide-react';

interface CallRequest {
  id: string;
  callerId: string;
  callerName: string;
  callerImage: string;
  callerAge: number;
  callerGender: string;
  type: 'now' | 'reservation';
  requestedTimeStart?: string;
  requestedTimeEnd?: string;
  message?: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

const mockRequests: CallRequest[] = [
  {
    id: '1',
    callerId: 'user1',
    callerName: '민수',
    callerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    callerAge: 28,
    callerGender: '남성',
    type: 'now',
    message: '안녕하세요! 영화 이야기 나누고 싶어요.',
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '2',
    callerId: 'user2',
    callerName: '서연',
    callerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    callerAge: 25,
    callerGender: '여성',
    type: 'reservation',
    requestedTimeStart: '2025-11-16 20:00',
    requestedTimeEnd: '2025-11-16 21:00',
    message: '오늘 저녁에 통화 가능하신가요?',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '3',
    callerId: 'user3',
    callerName: '준호',
    callerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    callerAge: 30,
    callerGender: '남성',
    type: 'now',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '4',
    callerId: 'user4',
    callerName: '유진',
    callerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    callerAge: 26,
    callerGender: '여성',
    type: 'reservation',
    requestedTimeStart: '2025-11-17 14:00',
    requestedTimeEnd: '2025-11-17 15:00',
    message: '내일 오후 시간 괜찮으신가요?',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    status: 'pending',
  },
];

export const HostCallRequestsScreen = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'now' | 'reservation'>('now');
  const [requests, setRequests] = useState(mockRequests);

  const handleAccept = (requestId: string) => {
    setRequests(requests.map((r) => (r.id === requestId ? { ...r, status: 'accepted' as const } : r)));
    // 실제로는 서버에 수락 요청
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map((r) => (r.id === requestId ? { ...r, status: 'rejected' as const } : r)));
    // 실제로는 서버에 거절 요청
  };

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredRequests = requests.filter((r) => r.type === selectedTab && r.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">통화 요청 목록</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="bg-gray-800 rounded-xl p-2 border border-gray-700 flex gap-2">
          <button
            onClick={() => setSelectedTab('now')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              selectedTab === 'now'
                ? 'bg-purple-600 text-white'
                : 'bg-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>지금 통화</span>
              {requests.filter((r) => r.type === 'now' && r.status === 'pending').length > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {requests.filter((r) => r.type === 'now' && r.status === 'pending').length}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedTab('reservation')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              selectedTab === 'reservation'
                ? 'bg-purple-600 text-white'
                : 'bg-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>예약</span>
              {requests.filter((r) => r.type === 'reservation' && r.status === 'pending').length > 0 && (
                <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                  {requests.filter((r) => r.type === 'reservation' && r.status === 'pending').length}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Request List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
            {selectedTab === 'now' ? (
              <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            ) : (
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            )}
            <p className="text-gray-500 mb-2">새로운 요청이 없습니다</p>
            <p className="text-sm text-gray-600">
              {selectedTab === 'now' ? '지금 통화 요청을 기다리고 있어요' : '예약 요청을 기다리고 있어요'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all"
              >
                {/* Caller Info */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={request.callerImage}
                    alt={request.callerName}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{request.callerName}</h3>
                      <span className="text-gray-400">{request.callerAge}세</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-400">{request.callerGender}</span>
                    </div>
                    <p className="text-sm text-gray-500">{getTimeAgo(request.createdAt)}</p>
                  </div>

                  {request.type === 'now' ? (
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">지금 통화</span>
                  ) : (
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">예약</span>
                  )}
                </div>

                {/* Reservation Time */}
                {request.type === 'reservation' && request.requestedTimeStart && request.requestedTimeEnd && (
                  <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-400 mb-1">희망 시간</p>
                    <p className="text-white font-medium">
                      {formatDateTime(request.requestedTimeStart)} ~ {formatDateTime(request.requestedTimeEnd)}
                    </p>
                  </div>
                )}

                {/* Message */}
                {request.message && (
                  <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-400 mb-1">메시지</p>
                    <p className="text-white">{request.message}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      <span>수락</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold transition-all"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <X className="w-5 h-5" />
                      <span>거절</span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
