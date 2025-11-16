import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './pages/HomeScreen';
import { ReservationsScreen } from './pages/ReservationsScreen';
import { HistoryScreen } from './pages/HistoryScreen';
import { MypageScreen } from './pages/MypageScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { PointChargeScreen } from './pages/PointChargeScreen';
import { SettingsScreen } from './pages/SettingsScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/reservations" element={<ReservationsScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/mypage" element={<MypageScreen />} />
        <Route path="/profile/:hostId" element={<ProfileScreen />} />
        <Route path="/point/charge" element={<PointChargeScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
