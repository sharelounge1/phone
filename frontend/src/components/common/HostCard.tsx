import { Star, MessageCircle, Heart, Phone } from 'lucide-react';
import type { Host } from '../../types/host';

interface HostCardProps {
  host: Host;
  onClick?: () => void;
  onCallClick?: () => void;
}

export const HostCard = ({ host, onClick, onCallClick }: HostCardProps) => {
  const getStatusBadge = () => {
    switch (host.status) {
      case 'online':
        return (
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            온라인 🟢
          </span>
        );
      case 'busy':
        return (
          <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            통화중 🔴
          </span>
        );
      case 'offline':
        return (
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            오프라인
          </span>
        );
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* 프로필 사진 */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={host.profileImage}
          alt={`${host.name} 프로필`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* 온라인 상태 배지 */}
        <div className="absolute top-3 right-3">
          {getStatusBadge()}
        </div>
        {/* 좋아요 버튼 */}
        <button
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: 좋아요 기능 구현
          }}
        >
          <Heart className="w-5 h-5 text-rose-500" />
        </button>
      </div>

      {/* 카드 내용 */}
      <div className="p-4">
        {/* 이름 & 나이 */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {host.name}, {host.age}
          </h3>
          <span className="text-sm text-gray-500">
            {host.gender === 'male' ? '👨' : '👩'}
          </span>
        </div>

        {/* 평점 & 통계 */}
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{host.rating}</span>
            <span className="text-gray-400">({host.reviewCount})</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{host.totalCallCount}회</span>
          </span>
        </div>

        {/* 자기소개 */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {host.introduction}
        </p>

        {/* 관심사 태그 */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {host.interests.slice(0, 3).map((interest, index) => (
            <span
              key={index}
              className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-medium border border-indigo-100"
            >
              #{interest}
            </span>
          ))}
        </div>

        {/* 분당 요금 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-semibold text-rose-600">
            💰 {host.callPricePerMin.toLocaleString()}P/분
          </span>
        </div>

        {/* 통화 요청 버튼 */}
        <button
          className={`w-full ${
            host.status === 'online'
              ? 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700'
              : 'bg-gray-300 cursor-not-allowed'
          } text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md disabled:hover:shadow-sm`}
          disabled={host.status !== 'online'}
          onClick={(e) => {
            e.stopPropagation();
            if (onCallClick) onCallClick();
          }}
        >
          <Phone className="w-5 h-5" />
          <span>{host.status === 'online' ? '지금 통화' : '통화 불가'}</span>
        </button>
      </div>
    </div>
  );
};
