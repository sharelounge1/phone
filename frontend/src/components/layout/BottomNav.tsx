import { Home, Calendar, Clock, User } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: '탐색', active: true },
    { icon: Calendar, label: '예약', active: false },
    { icon: Clock, label: '히스토리', active: false },
    { icon: User, label: 'MY', active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                item.active
                  ? 'text-indigo-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
