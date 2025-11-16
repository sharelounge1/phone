import { Phone, Star, MessageCircle, ChevronRight } from 'lucide-react';
import { mockHosts } from '../../data/mockHosts';

// 컨셉 5: 미니멀/클린 - 애플 스타일, 심플하고 세련된 느낌
export const Design5 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">DESIGN 5 - MINIMAL</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-600">
                10,000P
              </div>
              <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            대화하고 싶은<br />사람을 찾아보세요
          </h2>
          <p className="text-gray-500 text-lg">
            {mockHosts.filter(h => h.status === 'online').length}명이 온라인
          </p>
        </div>

        {/* Host List */}
        <div className="space-y-4">
          {mockHosts.map((host) => (
            <div
              key={host.id}
              className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
            >
              <div className="flex gap-6">
                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                  <img
                    src={host.profileImage}
                    alt={host.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  {/* Status Dot */}
                  {host.status === 'online' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name & Age */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {host.name}, {host.age}
                    </h3>
                    {host.status === 'online' && (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        온라인
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{host.rating}</span>
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span>{host.totalCallCount}회</span>
                    </span>
                  </div>

                  {/* Introduction */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {host.introduction}
                  </p>

                  {/* Interests */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {host.interests.slice(0, 3).map((interest, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Row: Price + Call Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">
                        {host.callPricePerMin}P
                      </span>
                      <span className="text-gray-500"> / 분</span>
                    </div>

                    <button
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                        host.status === 'online'
                          ? 'bg-gray-900 text-white hover:bg-gray-800'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={host.status !== 'online'}
                    >
                      <Phone className="w-4 h-4" />
                      <span>{host.status === 'online' ? '통화하기' : '오프라인'}</span>
                      {host.status === 'online' && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-around">
            <button className="flex flex-col items-center gap-1.5 text-gray-900">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              </div>
              <span className="text-xs font-medium">탐색</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 text-gray-400">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
              <span className="text-xs font-medium">예약</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 text-gray-400">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
              <span className="text-xs font-medium">히스토리</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 text-gray-400">
              <div className="w-6 h-6 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
              <span className="text-xs font-medium">MY</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pb-24" />
    </div>
  );
};
