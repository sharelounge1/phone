import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { DesignSelector } from './components/DesignSelector';
import { Design1 } from './components/designs/Design1';
import { Design2 } from './components/designs/Design2';
import { Design3 } from './components/designs/Design3';
import { Design4 } from './components/designs/Design4';
import { Design5 } from './components/designs/Design5';

// Back Button Component
const BackButton = () => {
  const location = useLocation();

  // Only show back button on design pages
  if (location.pathname === '/') return null;

  return (
    <Link
      to="/"
      className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg font-medium text-sm flex items-center gap-2 transition-all hover:shadow-xl"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      디자인 목록
    </Link>
  );
};

function App() {
  return (
    <BrowserRouter>
      <BackButton />
      <Routes>
        <Route path="/" element={<DesignSelector />} />
        <Route path="/1" element={<Design1 />} />
        <Route path="/2" element={<Design2 />} />
        <Route path="/3" element={<Design3 />} />
        <Route path="/4" element={<Design4 />} />
        <Route path="/5" element={<Design5 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
