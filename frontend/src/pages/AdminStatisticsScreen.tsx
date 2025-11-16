import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Phone, DollarSign, Download, BarChart3 } from 'lucide-react';

export const AdminStatisticsScreen = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('day');

  // Mock data
  const stats = {
    day: {
      signups: 24,
      calls: 156,
      revenue: 2340000,
      avgCallDuration: 18,
    },
    week: {
      signups: 168,
      calls: 1092,
      revenue: 16380000,
      avgCallDuration: 21,
    },
    month: {
      signups: 724,
      calls: 4680,
      revenue: 70200000,
      avgCallDuration: 19,
    },
  };

  const currentStats = stats[selectedPeriod];

  const handleExportCSV = () => {
    alert('CSV 파일이 다운로드됩니다.');
    // 실제로는 CSV 생성 및 다운로드 로직
  };

  const chartData = Array.from({ length: selectedPeriod === 'day' ? 24 : selectedPeriod === 'week' ? 7 : 30 }).map(
    (_, idx) => ({
      label:
        selectedPeriod === 'day'
          ? `${idx}시`
          : selectedPeriod === 'week'
          ? `${idx + 1}일`
          : `${idx + 1}일`,
      signups: Math.floor(Math.random() * 30),
      calls: Math.floor(Math.random() * 50),
      revenue: Math.floor(Math.random() * 500000),
    })
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold ml-4">통계</h1>
          </div>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV 다운로드
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Period Selection */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
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

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border-2 border-blue-500/50">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-gray-400">가입자</p>
            </div>
            <p className="text-3xl font-bold text-white">{currentStats.signups.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-2 border-purple-500/50">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-5 h-5 text-purple-400" />
              <p className="text-sm text-gray-400">통화 건수</p>
            </div>
            <p className="text-3xl font-bold text-white">{currentStats.calls.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-2 border-emerald-500/50">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <p className="text-sm text-gray-400">결제 금액</p>
            </div>
            <p className="text-2xl font-bold text-white">{(currentStats.revenue / 10000).toFixed(0)}만원</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-xl p-6 border-2 border-yellow-500/50">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <p className="text-sm text-gray-400">평균 통화</p>
            </div>
            <p className="text-3xl font-bold text-white">{currentStats.avgCallDuration}분</p>
          </div>
        </div>

        {/* Signups Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold">가입자 추이</h3>
          </div>

          <div className="h-64 flex items-end justify-around gap-1">
            {chartData.map((data, idx) => {
              const maxSignups = Math.max(...chartData.map((d) => d.signups));
              const height = (data.signups / maxSignups) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">{data.signups}</span>
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-600 rounded-t transition-all hover:from-blue-500 hover:to-cyan-500 cursor-pointer"
                      style={{ height: `${height}%`, minHeight: '8px' }}
                      title={`${data.label}: ${data.signups}명`}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{data.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calls Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold">통화 건수 추이</h3>
          </div>

          <div className="h-64 flex items-end justify-around gap-1">
            {chartData.map((data, idx) => {
              const maxCalls = Math.max(...chartData.map((d) => d.calls));
              const height = (data.calls / maxCalls) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">{data.calls}</span>
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t transition-all hover:from-purple-500 hover:to-pink-500 cursor-pointer"
                      style={{ height: `${height}%`, minHeight: '8px' }}
                      title={`${data.label}: ${data.calls}건`}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{data.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold">결제 금액 추이</h3>
          </div>

          <div className="h-64 flex items-end justify-around gap-1">
            {chartData.map((data, idx) => {
              const maxRevenue = Math.max(...chartData.map((d) => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">{(data.revenue / 10000).toFixed(0)}만</span>
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-teal-600 rounded-t transition-all hover:from-emerald-500 hover:to-teal-500 cursor-pointer"
                      style={{ height: `${height}%`, minHeight: '8px' }}
                      title={`${data.label}: ${data.revenue.toLocaleString()}원`}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{data.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold">상세 데이터</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">기간</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">가입자</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">통화 건수</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">결제 금액</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((data, idx) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3 px-4 text-white">{data.label}</td>
                    <td className="py-3 px-4 text-right text-blue-400">{data.signups}명</td>
                    <td className="py-3 px-4 text-right text-purple-400">{data.calls}건</td>
                    <td className="py-3 px-4 text-right text-emerald-400">{data.revenue.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-600 font-bold">
                  <td className="py-3 px-4 text-white">합계</td>
                  <td className="py-3 px-4 text-right text-blue-400">
                    {chartData.reduce((sum, d) => sum + d.signups, 0)}명
                  </td>
                  <td className="py-3 px-4 text-right text-purple-400">
                    {chartData.reduce((sum, d) => sum + d.calls, 0)}건
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400">
                    {chartData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}원
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
