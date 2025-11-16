import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mic, Headphones, Star, Zap, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { mockHosts } from '../data/mockHosts';
import { GamingBottomNav } from '../components/layout/GamingBottomNav';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [profileCardIndex, setProfileCardIndex] = useState(0);

  const categories = ['🎮 전체', '🔥 인기', '✨ 신규', '🇰🇷 한국어', '🎯 게임', '💬 수다', '🎵 음악'];

  const handleSwipeLeft = () => {
    setSelectedCategory((prev) => (prev + 1) % categories.length);
  };

  const handleSwipeRight = () => {
    setSelectedCategory((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleProfilePrev = () => {
    setProfileCardIndex((prev) => (prev - 1 + mockHosts.length) % mockHosts.length);
  };

  const handleProfileNext = () => {
    setProfileCardIndex((prev) => (prev + 1) % mockHosts.length);
  };

  const currentProfileHost = mockHosts[profileCardIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">FreeTalk</h1>
              <p className="text-xs text-gray-400">자유로운 음성 대화</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600" onClick={() => navigate('/point/charge')}>
              <span className="text-emerald-400 font-bold">10,000P</span>
            </div>
            <button className="text-gray-400 hover:text-white" onClick={() => navigate('/settings')}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories - Swipe 방식 */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={handleSwipeRight}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>

            {/* Category Display */}
            <div className="flex-1 flex justify-center overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out gap-2"
                style={{ transform: `translateX(-${selectedCategory * 100}px)` }}
              >
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(idx)}
                    className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      idx === selectedCategory
                        ? 'bg-purple-600 text-white scale-110'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleSwipeLeft}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Profile Card Slider */}
      <div className="bg-gray-800/30 border-b border-gray-700 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h2 className="text-lg font-bold text-gray-300">추천 프로필</h2>
          </div>

          {/* Profile Card Slider */}
          <div className="relative">
            {/* Profile Card */}
            <div
              className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-purple-500/50 backdrop-blur-sm cursor-pointer hover:border-purple-400 transition-all"
              onClick={() => navigate(`/profile/${currentProfileHost.id}`)}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={currentProfileHost.profileImage}
                    alt={currentProfileHost.name}
                    className="w-full md:w-48 h-64 rounded-xl object-cover"
                  />
                  {currentProfileHost.status === 'online' && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">{currentProfileHost.name}</h3>
                      <span className="text-lg text-gray-400">{currentProfileHost.age}세</span>
                      <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-yellow-400">{currentProfileHost.rating}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <span>통화 {currentProfileHost.totalCallCount}회</span>
                      <span>·</span>
                      <span>후기 {currentProfileHost.reviewCount}개</span>
                    </div>

                    {/* Introduction */}
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                      {currentProfileHost.introduction}
                    </p>

                    {/* Languages */}
                    <div className="flex gap-2 mb-4">
                      {currentProfileHost.languages.map((lang, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>

                    {/* Interests */}
                    <div className="flex gap-2 flex-wrap mb-4">
                      {currentProfileHost.interests.map((interest, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-lg border border-purple-500/30">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer - Call Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      <span className="text-2xl font-bold text-purple-400">{currentProfileHost.callPricePerMin}P</span>
                      <span className="text-gray-500">/분</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentProfileHost.status === 'online') {
                          navigate(`/call/${currentProfileHost.id}/request`);
                        }
                      }}
                      className={`px-8 py-3 rounded-xl font-bold transition-all text-lg ${
                        currentProfileHost.status === 'online'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={currentProfileHost.status !== 'online'}
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        <span>지금 통화하기</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handleProfilePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-800 hover:bg-gray-700 p-3 rounded-full shadow-xl border border-gray-700 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleProfileNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-800 hover:bg-gray-700 p-3 rounded-full shadow-xl border border-gray-700 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {mockHosts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setProfileCardIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === profileCardIndex
                    ? 'w-8 bg-purple-500'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
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
              onClick={() => navigate(`/profile/${host.id}`)}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    if (host.status === 'online') {
                      navigate(`/call/${host.id}/request`);
                    }
                  }}
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

      {/* Bottom Navigation */}
      <GamingBottomNav />
    </div>
  );
};
