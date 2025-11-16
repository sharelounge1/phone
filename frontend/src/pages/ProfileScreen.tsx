import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Star,
  Phone,
  Calendar,
  Heart,
  Share2,
  Flag,
  Zap,
  MessageSquare
} from 'lucide-react';
import { GamingBottomNav } from '../components/layout/GamingBottomNav';
import { mockHosts } from '../data/mockHosts';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const mockReviews: Review[] = [
  {
    id: 'review-1',
    userName: '익명',
    rating: 5,
    comment: '정말 좋은 대화였어요! 편안하게 이야기 나눌 수 있었습니다.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'review-2',
    userName: '익명',
    rating: 5,
    comment: '친절하고 재미있어요. 다음에 또 통화하고 싶습니다!',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'review-3',
    userName: '익명',
    rating: 4,
    comment: '좋았어요. 경청을 잘 해주셔서 감사합니다.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { hostId } = useParams<{ hostId: string }>();

  const host = mockHosts.find((h) => h.id === hostId);

  if (!host) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">호스트를 찾을 수 없습니다</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    return `${days}일 전`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-32">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">프로필</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Flag className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="relative">
          <img
            src={host.profileImage}
            alt={host.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

          {host.status === 'online' && (
            <div className="absolute top-4 right-4 px-4 py-2 bg-emerald-500 text-white font-bold rounded-full flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          )}

          <button
            onClick={() => alert('좋아요 추가/제거')}
            className="absolute bottom-4 right-4 p-3 bg-gray-900/70 hover:bg-gray-900 rounded-full backdrop-blur-sm transition-all"
          >
            <Heart className="w-6 h-6 text-pink-500" />
          </button>
        </div>

        <div className="px-4 py-6">
          {/* Basic Info */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl font-bold">{host.name}</h2>
              <span className="text-xl text-gray-400">{host.age}세</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-yellow-400">{host.rating}</span>
              </div>
              <span className="text-gray-400">통화 {host.totalCallCount}회</span>
              <span className="text-gray-400">후기 {host.reviewCount}개</span>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              {host.introduction}
            </p>

            {/* Languages */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-400 mb-2">언어</h3>
              <div className="flex gap-2">
                {host.languages.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 mb-2">관심사</h3>
              <div className="flex gap-2 flex-wrap">
                {host.interests.map((interest, idx) => (
                  <span key={idx} className="px-3 py-2 bg-purple-600/30 text-purple-300 rounded-lg border border-purple-500/30">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">통화 요금</p>
                  <div className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-3xl font-bold text-purple-400">{host.callPricePerMin}P</span>
                    <span className="text-gray-500">/분</span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <p>요청 비용: 200P</p>
                  <p className="mt-1">최소 1분 통화</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                후기 ({mockReviews.length})
              </h3>
            </div>

            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${
                              idx < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-4">
        <div className="max-w-6xl mx-auto flex gap-3">
          <button
            onClick={() => navigate(`/reservation/${host.id}/new`)}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            예약하기
          </button>
          <button
            onClick={() => {
              if (host.status === 'online') {
                navigate(`/call/${host.id}/request`);
              } else {
                alert('현재 오프라인 상태입니다');
              }
            }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              host.status === 'online'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            disabled={host.status !== 'online'}
          >
            <Phone className="w-5 h-5" />
            지금 통화하기
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <GamingBottomNav />
    </div>
  );
};
