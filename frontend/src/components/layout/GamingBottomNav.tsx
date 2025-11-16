import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Clock, User } from 'lucide-react';

export const GamingBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '탐색' },
    { path: '/reservations', icon: Calendar, label: '예약' },
    { path: '/history', icon: Clock, label: '히스토리' },
    { path: '/mypage', icon: User, label: 'MY' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-purple-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
