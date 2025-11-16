import { Header } from '../layout/Header';
import { BottomNav } from '../layout/BottomNav';
import { HomeScreen } from '../screens/home/HomeScreen';

// 원래 기본 디자인 - 최초 제작 버전
export const Design0 = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomeScreen />
      <BottomNav />
    </div>
  );
};
