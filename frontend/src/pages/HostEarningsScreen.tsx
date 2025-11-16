import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, BarChart3, Users, Clock } from 'lucide-react';

interface Earning {
  id: string;
  callerName: string;
  duration: number; // seconds
  amount: number;
  date: Date;
}

const mockEarnings: Earning[] = [
  {
    id: '1',
    callerName: '민수',
    duration: 900,
    amount: 4500,
    date: new Date('2025-11-16T14:30:00'),
  },
  {
    id: '2',
    callerName: '서연',
    duration: 1200,
    amount: 6000,
    date: new Date('2025-11-16T10:20:00'),
  },
  {
    id: '3',
    callerName: '준호',
    duration: 600,
    amount: 3000,
    date: new Date('2025-11-15T20:15:00'),
  },
  {
    id: '4',
    callerName: '유진',
    duration: 1800,
    amount: 9000,
    date: new Date('2025-11-15T16:45:00'),
  },
  {
    id: '5',
    callerName: '도현',
    duration: 720,
    amount: 3600,
    date: new Date('2025-11-14T18:30:00'),
  },
  {
    id: '6',
    callerName: '하늘',
    duration: 1500,
    amount: 7500,
    date: new Date('2025-11-14T12:00:00'),
  },
  {
    id: '7',
    callerName: '지은',
    duration: 1080,
    amount: 5400,
    date: new Date('2025-11-13T19:20:00'),
  },
];

export const HostEarningsScreen = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('day');

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}분 ${secs}초`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filterEarnings = () => {
    const now = new Date();
    let filtered = mockEarnings;

    if (selectedPeriod === 'day') {
      filtered = mockEarnings.filter((e) => {
        const diff = now.getTime() - e.date.getTime();
        return diff < 24 * 60 * 60 * 1000;
      });
    } else if (selectedPeriod === 'week') {
      filtered = mockEarnings.filter((e) => {
        const diff = now.getTime() - e.date.getTime();
        return diff < 7 * 24 * 60 * 60 * 1000;
      });
    } else {
      filtered = mockEarnings.filter((e) => {
        const diff = now.getTime() - e.date.getTime();
        return diff < 30 * 24 * 60 * 60 * 1000;
      });
    }

    return filtered;
  };

  const filteredEarnings = filterEarnings();
  const totalCalls = filteredEarnings.length;
  const totalDuration = filteredEarnings.reduce((sum, e) => sum + e.duration, 0);
  const totalEarnings = filteredEarnings.reduce((sum, e) => sum + e.amount, 0);
  const averageDuration = totalCalls > 0 ? Math.floor(totalDuration / totalCalls) : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">수익 관리</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Period Selection */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold">기간 선택</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'day' as const, label: '일간' },
              { value: 'week' as const, label: '주간' },
              { value: 'month' as const, label: '월간' },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`py-3 rounded-lg font-medium transition-all ${
                  selectedPeriod === period.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-4 border-2 border-purple-500/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <p className="text-sm text-gray-400">총 수익</p>
            </div>
            <p className="text-2xl font-bold text-white">{totalEarnings.toLocaleString()}P</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-4 border-2 border-blue-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-gray-400">통화 건수</p>
            </div>
            <p className="text-2xl font-bold text-white">{totalCalls}회</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-xl p-4 border-2 border-emerald-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <p className="text-sm text-gray-400">총 통화 시간</p>
            </div>
            <p className="text-2xl font-bold text-white">{Math.floor(totalDuration / 60)}분</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-xl p-4 border-2 border-yellow-500/50">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
              <p className="text-sm text-gray-400">평균 통화 시간</p>
            </div>
            <p className="text-2xl font-bold text-white">{Math.floor(averageDuration / 60)}분</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold">수익 추이</h3>
          </div>

          <div className="h-48 flex items-end justify-around gap-2">
            {Array.from({ length: selectedPeriod === 'day' ? 24 : selectedPeriod === 'week' ? 7 : 30 }).map((_, idx) => {
              const height = Math.random() * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t transition-all hover:from-purple-500 hover:to-pink-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">
                    {selectedPeriod === 'day' ? `${idx}시` : selectedPeriod === 'week' ? `${idx + 1}일` : `${idx + 1}일`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed List */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">상세 내역 ({filteredEarnings.length}건)</h3>

          {filteredEarnings.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">선택한 기간에 수익이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEarnings.map((earning) => (
                <div
                  key={earning.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-white mb-1">{earning.callerName}님과의 통화</p>
                      <p className="text-sm text-gray-400">{formatDate(earning.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-400">+{earning.amount.toLocaleString()}P</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>통화 시간: {formatDuration(earning.duration)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Withdrawal Button */}
        <button
          onClick={() => navigate('/host/withdrawal')}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50 transition-all"
        >
          출금 신청하기
        </button>
      </div>
    </div>
  );
};
