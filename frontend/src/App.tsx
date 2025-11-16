import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// 인증 페이지
import { LoginScreen } from './pages/LoginScreen';

// 기본 페이지
import { HomeScreen } from './pages/HomeScreen';
import { ReservationsScreen } from './pages/ReservationsScreen';
import { HistoryScreen } from './pages/HistoryScreen';
import { MypageScreen } from './pages/MypageScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { PointChargeScreen } from './pages/PointChargeScreen';
import { SettingsScreen } from './pages/SettingsScreen';

// 추가 페이지
import { CallRequestScreen } from './pages/CallRequestScreen';
import { ReservationRequestScreen } from './pages/ReservationRequestScreen';
import { HostApplicationScreen } from './pages/HostApplicationScreen';
import { PointTransactionScreen } from './pages/PointTransactionScreen';
import { SupportScreen } from './pages/SupportScreen';
import { ProfileEditScreen } from './pages/ProfileEditScreen';

// 호스트 전용
import { HostDashboardScreen } from './pages/HostDashboardScreen';
import { HostCallRequestsScreen } from './pages/HostCallRequestsScreen';
import { HostEarningsScreen } from './pages/HostEarningsScreen';
import { HostReviewsScreen } from './pages/HostReviewsScreen';
import { WithdrawalScreen } from './pages/WithdrawalScreen';

// 관리자 전용
import { AdminLoginScreen } from './pages/AdminLoginScreen';
import { AdminDashboardScreen } from './pages/AdminDashboardScreen';
import { AdminHostApprovalScreen } from './pages/AdminHostApprovalScreen';
import { AdminUsersScreen } from './pages/AdminUsersScreen';
import { AdminStatisticsScreen } from './pages/AdminStatisticsScreen';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 (인증 불필요) */}
        <Route path="/login" element={<LoginScreen />} />

        {/* 메인 페이지 (인증 필요) */}
        <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute><ReservationsScreen /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryScreen /></ProtectedRoute>} />
        <Route path="/mypage" element={<ProtectedRoute><MypageScreen /></ProtectedRoute>} />

        {/* 프로필 & 통화 */}
        <Route path="/profile/:hostId" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
        <Route path="/profile/edit" element={<ProtectedRoute><ProfileEditScreen /></ProtectedRoute>} />
        <Route path="/call/:hostId/request" element={<ProtectedRoute><CallRequestScreen /></ProtectedRoute>} />
        <Route path="/reservations/:hostId/new" element={<ProtectedRoute><ReservationRequestScreen /></ProtectedRoute>} />

        {/* 포인트 */}
        <Route path="/point/charge" element={<ProtectedRoute><PointChargeScreen /></ProtectedRoute>} />
        <Route path="/point/transactions" element={<ProtectedRoute><PointTransactionScreen /></ProtectedRoute>} />

        {/* 기타 */}
        <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><SupportScreen /></ProtectedRoute>} />
        <Route path="/mypage/host/apply" element={<ProtectedRoute><HostApplicationScreen /></ProtectedRoute>} />

        {/* 호스트 전용 */}
        <Route path="/host/dashboard" element={<ProtectedRoute><HostDashboardScreen /></ProtectedRoute>} />
        <Route path="/host/requests" element={<ProtectedRoute><HostCallRequestsScreen /></ProtectedRoute>} />
        <Route path="/host/earnings" element={<ProtectedRoute><HostEarningsScreen /></ProtectedRoute>} />
        <Route path="/host/reviews" element={<ProtectedRoute><HostReviewsScreen /></ProtectedRoute>} />
        <Route path="/host/withdrawal" element={<ProtectedRoute><WithdrawalScreen /></ProtectedRoute>} />

        {/* 관리자 전용 */}
        <Route path="/admin/login" element={<AdminLoginScreen />} />
        <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
        <Route path="/admin/host-approval" element={<AdminHostApprovalScreen />} />
        <Route path="/admin/users" element={<AdminUsersScreen />} />
        <Route path="/admin/statistics" element={<AdminStatisticsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
