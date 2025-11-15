import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HomeScreen } from './components/screens/home/HomeScreen';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HomeScreen />
      <BottomNav />
    </div>
  );
}

export default App;
