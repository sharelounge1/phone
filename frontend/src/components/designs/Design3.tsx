import { Phone, Mic, Headphones, Star, Zap } from 'lucide-react';
import { mockHosts } from '../../data/mockHosts';

// 컨셉 3: Discord/Gaming 스타일 - 다크 모드, 네온 색상
export const Design3 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DESIGN 3 - GAMING</h1>
              <p className="text-xs text-gray-400">다크모드 & 네온</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-700 px-4 py-2 rounded-lg">
              <span className="text-emerald-400 font-bold">10,000P</span>
            </div>
            <button className="text-gray-400 hover:text-white">⚙️</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-800/50 border-b border-gray-700 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2">
          {['🎮 전체', '🔥 인기', '✨ 신규', '🇰🇷 한국어', '🎯 게임', '💬 수다', '🎵 음악'].map((cat, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                idx === 0
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Voice Channels Header */}
        <div className="flex items-center gap-2 mb-4">
          <Mic className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-gray-300">음성 채널</h2>
          <span className="text-sm text-gray-500">({mockHosts.length}명 온라인)</span>
        </div>

        {/* Host Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockHosts.map((host) => (
            <div
              key={host.id}
              className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="relative">
                  <img
                    src={host.profileImage}
                    alt={host.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  {host.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-gray-800 rounded-full flex items-center justify-center">
                      <Mic className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{host.name}</h3>
                    <span className="text-xs text-gray-500">{host.age}세</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{host.rating}</span>
                    <span>·</span>
                    <span>{host.totalCallCount}회</span>
                  </div>
                </div>

                {host.status === 'online' && (
                  <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded font-bold">
                    LIVE
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{host.introduction}</p>

              {/* Tags */}
              <div className="flex gap-1 mb-3 flex-wrap">
                {host.interests.slice(0, 3).map((interest, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                    {interest}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-purple-400">{host.callPricePerMin}P</span>
                  <span className="text-xs text-gray-500">/분</span>
                </div>

                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    host.status === 'online'
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={host.status !== 'online'}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>통화</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold">대기 중...</div>
              <div className="text-xs text-gray-400">통화 상대를 선택하세요</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">🏠</button>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">💬</button>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">👤</button>
          </div>
        </div>
      </div>

      <div className="pb-20" />
    </div>
  );
};
