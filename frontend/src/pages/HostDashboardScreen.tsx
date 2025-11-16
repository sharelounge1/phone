import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, TrendingUp, Star, MessageCircle, DollarSign, Clock, Users, ChevronRight } from 'lucide-react';

interface CallRequest {
  id: string;
  callerId: string;
  callerName: string;
  callerImage: string;
  callerAge: number;
  type: 'now' | 'reservation';
  requestedTime?: string;
  createdAt: Date;
}

const mockRequests: CallRequest[] = [
  {
    id: '1',
    callerId: 'user1',
    callerName: '민수',
    callerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    callerAge: 28,
    type: 'now',
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: '2',
    callerId: 'user2',
    callerName: '서연',
    callerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    callerAge: 25,
    type: 'reservation',
    requestedTime: '오늘 20:00 ~ 21:00',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
];

const mockReviews = [
  {
    id: '1',
    reviewerName: '익명',
    rating: 5,
    comment: '정말 좋은 대화였어요! 다음에 또 통화하고 싶습니다 😊',
    createdAt: '2시간 전',
  },
  {
    id: '2',
    reviewerName: '익명',
    rating: 4,
    comment: '친절하고 재미있었습니다.',
    createdAt: '5시간 전',
  },
  {
    id: '3',
    reviewerName: '익명',
    rating: 5,
    comment: '편하게 대화할 수 있어서 좋았어요.',
    createdAt: '1일 전',
  },
];

export const HostDashboardScreen = () => {
  const navigate = useNavigate();

  const todayEarnings = 45000;
  const monthlyEarnings = 320000;
  const totalCalls = 128;
  const averageRating = 4.8;

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate('/mypage')} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold ml-4">호스트 대시보드</h1>
          </div>
          <button
            onClick={() => navigate('/host/requests')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors text-sm"
          >
            요청 목록
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-4 border-2 border-purple-500/50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <p className="text-sm text-gray-400">오늘 수익</p>
            </div>
            <p className="text-2xl font-bold text-white">{todayEarnings.toLocaleString()}P</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-xl p-4 border-2 border-emerald-500/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <p className="text-sm text-gray-400">이번 달 수익</p>
            </div>
            <p className="text-2xl font-bold text-white">{monthlyEarnings.toLocaleString()}P</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-4 border-2 border-blue-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-gray-400">총 통화 건수</p>
            </div>
            <p className="text-2xl font-bold text-white">{totalCalls}회</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-xl p-4 border-2 border-yellow-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <p className="text-sm text-gray-400">평균 별점</p>
            </div>
            <p className="text-2xl font-bold text-white">{averageRating}</p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold">대기 중인 요청</h3>
              {mockRequests.length > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  {mockRequests.length}
                </span>
              )}
            </div>
            <button
              onClick={() => navigate('/host/requests')}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
            >
              전체보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {mockRequests.length === 0 ? (
            <div className="text-center py-8">
              <Phone className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">새로운 요청이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={request.callerImage} alt={request.callerName} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-white">{request.callerName}</p>
                        <span className="text-sm text-gray-400">{request.callerAge}세</span>
                        {request.type === 'now' ? (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">지금 통화</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">예약</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {request.type === 'reservation' ? request.requestedTime : getTimeAgo(request.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors">
                      수락
                    </button>
                    <button className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium transition-colors">
                      거절
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold">최근 받은 후기</h3>
            </div>
            <button
              onClick={() => navigate('/host/reviews')}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
            >
              전체보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-white">{review.reviewerName}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500">{review.createdAt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/host/earnings')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors text-left"
          >
            <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
            <p className="font-bold mb-1">수익 관리</p>
            <p className="text-sm text-gray-400">상세 수익 내역 확인</p>
          </button>

          <button
            onClick={() => navigate('/host/withdrawal')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors text-left"
          >
            <DollarSign className="w-8 h-8 text-emerald-400 mb-3" />
            <p className="font-bold mb-1">출금 신청</p>
            <p className="text-sm text-gray-400">수익금 출금하기</p>
          </button>
        </div>
      </div>
    </div>
  );
};
