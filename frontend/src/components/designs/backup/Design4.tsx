import { Phone, Heart, Star, Sparkles } from 'lucide-react';
import { mockHosts } from '../../data/mockHosts';

// 컨셉 4: Bumble 스타일 - 노란색, 밝고 친근한 느낌
export const Design4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-yellow-400 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🐝</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">DESIGN 4 - BUMBLE</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="font-bold text-gray-800">10,000P 💎</span>
              </div>
              <button className="text-gray-800 text-xl">👤</button>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Banner */}
      <div className="bg-white border-b border-yellow-200 py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-center">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <p className="text-gray-700 font-medium">
              지금 <span className="font-bold text-yellow-600">{mockHosts.filter(h => h.status === 'online').length}명</span>이 대화를 기다리고 있어요! 🎉
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Host Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockHosts.map((host) => (
            <div
              key={host.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={host.profileImage}
                  alt={host.name}
                  className="w-full h-64 object-cover"
                />
                {/* Status Badge */}
                {host.status === 'online' && (
                  <div className="absolute top-4 right-4 bg-emerald-400 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    🟢 온라인
                  </div>
                )}
                {/* Quick Action */}
                <button className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-rose-500" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Name & Age */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {host.name}, {host.age}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-700">{host.rating}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-600 text-sm">{host.totalCallCount}회 통화</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {host.callPricePerMin}P
                    </div>
                    <div className="text-xs text-gray-500">/ 분</div>
                  </div>
                </div>

                {/* Introduction */}
                <p className="text-gray-600 mb-4 line-clamp-2">{host.introduction}</p>

                {/* Interests */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {host.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Languages */}
                <div className="flex gap-2 mb-4">
                  {host.languages.map((lang, idx) => (
                    <span key={idx} className="text-sm text-gray-500">
                      {lang === '한국어' ? '🇰🇷' : lang === '영어' ? '🇺🇸' : '🇯🇵'} {lang}
                    </span>
                  ))}
                </div>

                {/* Call Button */}
                <button
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    host.status === 'online'
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800 shadow-md hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={host.status !== 'online'}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-6 h-6" />
                    {host.status === 'online' ? '지금 통화하기 🎉' : '오프라인'}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-yellow-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-around">
            <button className="flex flex-col items-center gap-1 text-yellow-600">
              <span className="text-2xl">🏠</span>
              <span className="text-xs font-medium">홈</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="text-2xl">💬</span>
              <span className="text-xs font-medium">채팅</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="text-2xl">❤️</span>
              <span className="text-xs font-medium">좋아요</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="text-2xl">👤</span>
              <span className="text-xs font-medium">MY</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pb-20" />
    </div>
  );
};
