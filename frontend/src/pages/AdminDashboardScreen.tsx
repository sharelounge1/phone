import { useNavigate } from 'react-router-dom';
import { Users, Phone, DollarSign, AlertTriangle, CheckCircle, TrendingUp, BarChart3, Shield } from 'lucide-react';

export const AdminDashboardScreen = () => {
  const navigate = useNavigate();

  // Mock stats
  const stats = {
    todaySignups: 24,
    todayCalls: 156,
    todayRevenue: 2340000,
    pendingHostApplications: 8,
    pendingReports: 3,
    totalUsers: 1284,
    totalHosts: 86,
    activeUsers: 432,
  };

  const recentReports = [
    {
      id: '1',
      reporterName: '익명',
      targetName: '지은',
      reason: '부적절한 대화',
      createdAt: '10분 전',
    },
    {
      id: '2',
      reporterName: '익명',
      targetName: '민준',
      reason: '금전 요구',
      createdAt: '2시간 전',
    },
    {
      id: '3',
      reporterName: '익명',
      targetName: '서연',
      reason: '욕설',
      createdAt: '5시간 전',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">관리자 대시보드</h1>
              <p className="text-xs text-gray-400">FreeTalk Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/mypage')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors text-sm"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Today Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border-2 border-blue-500/50">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-blue-400" />
              <p className="text-gray-400">오늘 가입자</p>
            </div>
            <p className="text-3xl font-bold text-white">{stats.todaySignups}명</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-2 border-purple-500/50">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-6 h-6 text-purple-400" />
              <p className="text-gray-400">오늘 통화 건수</p>
            </div>
            <p className="text-3xl font-bold text-white">{stats.todayCalls}건</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-2 border-emerald-500/50">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              <p className="text-gray-400">오늘 결제 금액</p>
            </div>
            <p className="text-3xl font-bold text-white">{stats.todayRevenue.toLocaleString()}원</p>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/admin/host-approval')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold">호스트 승인 대기</h3>
              </div>
              {stats.pendingHostApplications > 0 && (
                <span className="px-3 py-1 bg-yellow-500 text-gray-900 text-sm font-bold rounded-full">
                  {stats.pendingHostApplications}건
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">새로운 호스트 신청을 검토해주세요</p>
          </div>

          <div
            onClick={() => navigate('/admin/reports')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-red-500 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold">신고 접수</h3>
              </div>
              {stats.pendingReports > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                  {stats.pendingReports}건
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">처리 대기 중인 신고 내역</p>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold">전체 통계</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">전체 사용자</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">등록된 호스트</p>
              <p className="text-2xl font-bold text-white">{stats.totalHosts.toLocaleString()}</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">활성 사용자</p>
              <p className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">호스트 비율</p>
              <p className="text-2xl font-bold text-white">
                {((stats.totalHosts / stats.totalUsers) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-bold">최근 신고 내역</h3>
            </div>
            <button
              onClick={() => navigate('/admin/reports')}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              전체보기
            </button>
          </div>

          <div className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white mb-1">
                      {report.reporterName} → {report.targetName}
                    </p>
                    <p className="text-sm text-gray-400">{report.reason}</p>
                  </div>
                  <span className="text-xs text-gray-500">{report.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Menu */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors text-left"
          >
            <Users className="w-8 h-8 text-purple-400 mb-3" />
            <p className="font-bold mb-1">유저 관리</p>
            <p className="text-sm text-gray-400">전체 유저 목록</p>
          </button>

          <button
            onClick={() => navigate('/admin/host-approval')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors text-left"
          >
            <CheckCircle className="w-8 h-8 text-yellow-400 mb-3" />
            <p className="font-bold mb-1">호스트 승인</p>
            <p className="text-sm text-gray-400">신청 검토</p>
          </button>

          <button
            onClick={() => navigate('/admin/reports')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors text-left"
          >
            <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
            <p className="font-bold mb-1">신고 관리</p>
            <p className="text-sm text-gray-400">신고 처리</p>
          </button>

          <button
            onClick={() => navigate('/admin/statistics')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors text-left"
          >
            <TrendingUp className="w-8 h-8 text-emerald-400 mb-3" />
            <p className="font-bold mb-1">통계</p>
            <p className="text-sm text-gray-400">상세 통계 조회</p>
          </button>
        </div>
      </div>
    </div>
  );
};
