import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/reservations" element={<ReservationsScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/mypage" element={<MypageScreen />} />

        {/* 프로필 & 통화 */}
        <Route path="/profile/:hostId" element={<ProfileScreen />} />
        <Route path="/profile/edit" element={<ProfileEditScreen />} />
        <Route path="/call/:hostId/request" element={<CallRequestScreen />} />
        <Route path="/reservations/:hostId/new" element={<ReservationRequestScreen />} />

        {/* 포인트 */}
        <Route path="/point/charge" element={<PointChargeScreen />} />
        <Route path="/point/transactions" element={<PointTransactionScreen />} />

        {/* 기타 */}
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/mypage/host/apply" element={<HostApplicationScreen />} />

        {/* 호스트 전용 */}
        <Route path="/host/dashboard" element={<HostDashboardScreen />} />
        <Route path="/host/requests" element={<HostCallRequestsScreen />} />
        <Route path="/host/earnings" element={<HostEarningsScreen />} />
        <Route path="/host/reviews" element={<HostReviewsScreen />} />
        <Route path="/host/withdrawal" element={<WithdrawalScreen />} />

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
