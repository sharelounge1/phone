import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Heart, Star, Zap, ChevronLeft, MessageSquare } from 'lucide-react';
import { GamingBottomNav } from '../components/layout/GamingBottomNav';
import { mockHosts } from '../data/mockHosts';

interface CallHistory {
  id: string;
  hostId: string;
  hostName: string;
  hostImage: string;
  callTime: Date;
  duration: number; // 초 단위
  usedPoints: number;
  rating?: number;
  reviewed: boolean;
}

const mockCallHistory: CallHistory[] = [
  {
    id: 'call-1',
    hostId: '1',
    hostName: '지은',
    hostImage: mockHosts[0].profileImage,
    callTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    duration: 1234,
    usedPoints: 6170,
    rating: 5,
    reviewed: true,
  },
  {
    id: 'call-2',
    hostId: '2',
    hostName: '민준',
    hostImage: mockHosts[1].profileImage,
    callTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    duration: 890,
    usedPoints: 7417,
    reviewed: false,
  },
  {
    id: 'call-3',
    hostId: '4',
    hostName: '준호',
    hostImage: mockHosts[3].profileImage,
    callTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duration: 1567,
    usedPoints: 9142,
    rating: 4,
    reviewed: true,
  },
];

const mockFavorites = [mockHosts[0], mockHosts[1], mockHosts[4]];

export const HistoryScreen = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'history' | 'favorites'>('history');

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  const formatCallTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return `${hours}시간 전`;
    }
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  const handleWriteReview = (callId: string, hostId: string) => {
    alert('후기 작성 화면으로 이동 (미구현)');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">히스토리</h1>
              <p className="text-xs text-gray-400">통화 기록 & 좋아요</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2">
          <button
            onClick={() => setTab('history')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              tab === 'history'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            통화 기록 ({mockCallHistory.length})
          </button>
          <button
            onClick={() => setTab('favorites')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              tab === 'favorites'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            좋아요 ({mockFavorites.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'history' && (
          <div className="space-y-4">
            {mockCallHistory.length === 0 ? (
              <div className="text-center py-16">
                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 mb-2">통화 기록이 없습니다</p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium"
                >
                  통화 시작하기
                </button>
              </div>
            ) : (
              mockCallHistory.map((call) => (
                <div
                  key={call.id}
                  className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={call.hostImage}
                      alt={call.hostName}
                      className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                      onClick={() => navigate(`/profile/${call.hostId}`)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{call.hostName}</h3>
                        {call.reviewed && call.rating && (
                          <div className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-yellow-400">{call.rating}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{formatCallTime(call.callTime)}</span>
                          <span>·</span>
                          <span>{formatDuration(call.duration)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-purple-400 font-bold">{call.usedPoints}P 사용</span>
                        </div>
                      </div>

                      {!call.reviewed && (
                        <button
                          onClick={() => handleWriteReview(call.id, call.hostId)}
                          className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          후기 작성하기
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockFavorites.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 mb-2">좋아요한 호스트가 없습니다</p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium"
                >
                  호스트 둘러보기
                </button>
              </div>
            ) : (
              mockFavorites.map((host) => (
                <div
                  key={host.id}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-pink-500 transition-all cursor-pointer"
                  onClick={() => navigate(`/profile/${host.id}`)}
                >
                  <div className="relative mb-3">
                    <img
                      src={host.profileImage}
                      alt={host.name}
                      className="w-full h-48 rounded-lg object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('좋아요 취소');
                      }}
                      className="absolute top-2 right-2 p-2 bg-gray-900/70 rounded-full hover:bg-gray-900"
                    >
                      <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                    </button>
                    {host.status === 'online' && (
                      <div className="absolute top-2 left-2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{host.name}, {host.age}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{host.rating}</span>
                    <span>·</span>
                    <span>{host.totalCallCount}회</span>
                  </div>

                  <div className="flex gap-1 mb-3 flex-wrap">
                    {host.interests.slice(0, 3).map((interest, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded">
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-purple-400">{host.callPricePerMin}P/분</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <GamingBottomNav />
    </div>
  );
};
