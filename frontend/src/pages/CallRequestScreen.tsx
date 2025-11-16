import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, X, Zap, AlertCircle, User, Star, ArrowLeft } from 'lucide-react';
import { mockHosts } from '../data/mockHosts';

export const CallRequestScreen = () => {
  const { hostId } = useParams<{ hostId: string }>();
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  // Mock current user balance
  const userBalance = 10000;
  const requestCost = 200;

  const host = mockHosts.find((h) => h.id === hostId);

  const maxCallTime = useMemo(() => {
    if (!host) return 0;
    const afterRequestBalance = userBalance - requestCost;
    if (afterRequestBalance <= 0) return 0;
    return Math.floor(afterRequestBalance / host.callPricePerMin);
  }, [host, userBalance]);

  const canAffordCall = useMemo(() => {
    if (!host) return false;
    return userBalance >= requestCost + host.callPricePerMin;
  }, [host, userBalance]);

  if (!host) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">호스트를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleCallRequest = async () => {
    setIsRequesting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRequesting(false);
    navigate(`/call/${hostId}/connecting`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">통화 요청</h1>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Host Info Card */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-purple-500/50 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={host.profileImage}
              alt={host.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{host.name}</h2>
                <span className="text-gray-400">{host.age}세</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{host.rating}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-400">통화 {host.totalCallCount}회</span>
              </div>
              <p className="text-gray-300 text-sm">{host.introduction}</p>
            </div>
          </div>

          {/* Languages & Interests */}
          <div className="flex gap-2 mb-3">
            {host.languages.map((lang, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                {lang}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {host.interests.map((interest, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-lg border border-purple-500/30">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Price Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            요금 안내
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">통화 요청 비용</span>
              <span className="text-xl font-bold text-purple-400">{requestCost}P</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
              <span className="text-gray-400">분당 통화 요금</span>
              <span className="text-xl font-bold text-purple-400">{host.callPricePerMin}P</span>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">예상 통화 가능 시간</span>
                <span className="text-2xl font-bold text-emerald-400">{maxCallTime}분</span>
              </div>
              <p className="text-xs text-gray-500">
                * 요청 비용({requestCost}P) 차감 후 잔액 기준
              </p>
            </div>
          </div>
        </div>

        {/* Balance Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" />
            내 포인트
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">현재 보유 포인트</span>
              <span className="text-2xl font-bold text-emerald-400">{userBalance.toLocaleString()}P</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
              <span className="text-gray-400">요청 후 잔액</span>
              <span className="text-xl font-bold text-yellow-400">
                {(userBalance - requestCost).toLocaleString()}P
              </span>
            </div>
          </div>

          {!canAffordCall && (
            <div className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium mb-1">포인트가 부족합니다</p>
                <p className="text-sm text-gray-400">
                  최소 {(requestCost + host.callPricePerMin).toLocaleString()}P가 필요합니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCallRequest}
            disabled={!canAffordCall || isRequesting}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              canAffordCall && !isRequesting
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>{isRequesting ? '요청 중...' : '지금 통화 요청하기'}</span>
            </div>
          </button>

          {!canAffordCall && (
            <button
              onClick={() => navigate('/point/charge')}
              className="w-full py-4 rounded-xl font-bold text-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                <span>포인트 충전하기</span>
              </div>
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gray-700 hover:bg-gray-600 text-white transition-all"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
