import { useState } from 'react';
import { Phone, Heart, X, Star, Zap } from 'lucide-react';
import type { Host } from '../../types/host';
import { mockHosts } from '../../data/mockHosts';

// 컨셉 1: Tinder 스타일 - 스와이프 카드, 대담한 그라디언트
export const Design1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentHost = mockHosts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockHosts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockHosts.length) % mockHosts.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center p-4">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <h1 className="text-2xl font-bold text-white">FreeTalk</h1>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-full">
            <span className="text-white font-bold">10,000P</span>
          </div>
        </div>
      </div>

      {/* Swipe Card */}
      <div className="w-full max-w-md mt-20 mb-24">
        <div className="relative">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
            {/* Image */}
            <div className="relative h-[500px]">
              <img
                src={currentHost.profileImage}
                alt={currentHost.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Info on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <h2 className="text-4xl font-bold mb-1">{currentHost.name}, {currentHost.age}</h2>
                    <div className="flex items-center gap-2 text-white/90">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{currentHost.rating}</span>
                      <span>·</span>
                      <span>{currentHost.totalCallCount}회 통화</span>
                    </div>
                  </div>
                  <div className="bg-emerald-500 px-4 py-2 rounded-full text-sm font-bold">
                    온라인
                  </div>
                </div>

                <p className="text-lg mb-4">{currentHost.introduction}</p>

                <div className="flex gap-2 mb-4">
                  {currentHost.interests.map((interest, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      #{interest}
                    </span>
                  ))}
                </div>

                <div className="text-2xl font-bold text-yellow-300">
                  💰 {currentHost.callPricePerMin}P/분
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-8 h-8 text-red-500" />
            </button>

            <button
              onClick={handleNext}
              className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Phone className="w-10 h-10 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            </button>
          </div>

          {/* Card Counter */}
          <div className="text-center mt-4">
            <span className="text-white text-lg font-semibold">
              {currentIndex + 1} / {mockHosts.length}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md">
        <div className="max-w-md mx-auto px-6 py-4 flex justify-around">
          <button className="text-white">🏠 홈</button>
          <button className="text-white/60">💬 채팅</button>
          <button className="text-white/60">👤 프로필</button>
        </div>
      </div>
    </div>
  );
};
