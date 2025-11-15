import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-600">FreeTalk</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">
            <span className="font-semibold text-indigo-700">10,000P</span>
            <span>💎</span>
          </button>
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="프로필"
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:border-indigo-500 transition-colors"
          />
        </div>
      </div>
    </header>
  );
};
