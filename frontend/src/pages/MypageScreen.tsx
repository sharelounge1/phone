import { useNavigate } from 'react-router-dom';
import {
  User,
  Zap,
  CreditCard,
  Receipt,
  Settings,
  UserPlus,
  HelpCircle,
  ChevronRight,
  Star,
  Phone
} from 'lucide-react';
import { GamingBottomNav } from '../components/layout/GamingBottomNav';

export const MypageScreen = () => {
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: '홍길동',
    email: 'user@example.com',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    points: 10000,
    rating: 4.8,
    totalCalls: 23,
    isHost: false,
  };

  const menuItems = [
    {
      icon: CreditCard,
      label: '포인트 충전',
      path: '/point/charge',
      color: 'text-emerald-400',
    },
    {
      icon: Receipt,
      label: '포인트 사용 내역',
      path: '/point/transactions',
      color: 'text-purple-400',
    },
    {
      icon: Settings,
      label: '설정',
      path: '/settings',
      color: 'text-gray-400',
    },
    {
      icon: UserPlus,
      label: '호스트 신청',
      path: '/mypage/host/apply',
      color: 'text-pink-400',
    },
    {
      icon: HelpCircle,
      label: '고객센터',
      path: '/support',
      color: 'text-blue-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">마이페이지</h1>
              <p className="text-xs text-gray-400">내 정보 관리</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-purple-500/50 backdrop-blur-sm mb-6">
          <div className="flex items-start gap-4">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-sm text-gray-400 mb-4">{user.email}</p>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">
                    <span className="font-bold text-yellow-400">{user.rating}</span>
                    <span className="text-gray-400"> 평점</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">
                    <span className="font-bold text-purple-400">{user.totalCalls}</span>
                    <span className="text-gray-400"> 통화</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/profile/edit')}
                className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all"
              >
                프로필 수정
              </button>
            </div>
          </div>
        </div>

        {/* Points Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">내 포인트</p>
                <p className="text-2xl font-bold text-emerald-400">{user.points.toLocaleString()}P</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/point/charge')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-all"
            >
              충전하기
            </button>
          </div>
          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={() => navigate('/point/transactions')}
              className="text-sm text-gray-400 hover:text-purple-400 flex items-center gap-1"
            >
              포인트 사용 내역 보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-all border-b border-gray-700 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium text-white">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            );
          })}
        </div>

        {/* Host Status (if user is host) */}
        {user.isHost && (
          <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">호스트 계정</h3>
                <p className="text-xs text-gray-400">승인 완료</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/mypage/host/dashboard')}
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-all"
            >
              호스트 대시보드
            </button>
          </div>
        )}

        {/* App Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>FreeTalk v1.0.0</p>
          <p className="mt-1">© 2025 FreeTalk. All rights reserved.</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <GamingBottomNav />
    </div>
  );
};
