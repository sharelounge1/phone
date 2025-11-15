import { Phone, MessageCircle, Star, ChevronLeft } from 'lucide-react';
import { mockHosts } from '../../data/mockHosts';

// 컨셉 2: Instagram Stories 스타일 - 풀스크린 세로 카드
export const Design2 = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Story Progress Bars */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex gap-1">
        {mockHosts.slice(0, 5).map((_, idx) => (
          <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full bg-white ${idx === 0 ? 'w-full' : 'w-0'}`} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="fixed top-8 left-0 right-0 z-40 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-6 h-6 text-white" />
          <div className="w-10 h-10 rounded-full border-2 border-pink-500 p-0.5">
            <img
              src={mockHosts[0].profileImage}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="text-white font-bold">{mockHosts[0].name}</div>
            <div className="text-white/70 text-xs">2분 전</div>
          </div>
        </div>
        <div className="text-white text-sm">🔥 인기</div>
      </div>

      {/* Fullscreen Card */}
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        {mockHosts.slice(0, 5).map((host, idx) => (
          <div key={idx} className="h-screen snap-start relative">
            {/* Background Image */}
            <img
              src={host.profileImage}
              alt={host.name}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {/* Profile Info */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{host.name}, {host.age}</h2>
                  <span className="bg-emerald-500 px-3 py-1 rounded-full text-xs font-bold">
                    ONLINE
                  </span>
                </div>

                <div className="flex items-center gap-4 text-white/90 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{host.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{host.totalCallCount}회</span>
                  </div>
                  <div className="text-yellow-400 font-bold">
                    {host.callPricePerMin}P/분
                  </div>
                </div>

                <p className="text-lg mb-4 line-clamp-2">{host.introduction}</p>

                <div className="flex gap-2">
                  {host.interests.map((interest, i) => (
                    <span key={i} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
                지금 통화하기
              </button>
            </div>

            {/* Side Actions */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6">
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  ❤️
                </div>
                <span className="text-white text-xs">{host.reviewCount}</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  💬
                </div>
                <span className="text-white text-xs">후기</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  ⭐
                </div>
                <span className="text-white text-xs">저장</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
