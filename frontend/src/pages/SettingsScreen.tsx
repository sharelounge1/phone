import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  UserX,
  ChevronRight,
  Ban
} from 'lucide-react';
import { GamingBottomNav } from '../components/layout/GamingBottomNav';

export const SettingsScreen = () => {
  const navigate = useNavigate();
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃되었습니다');
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('정말로 회원 탈퇴하시겠습니까?\n모든 데이터가 삭제되며 복구할 수 없습니다.')) {
      alert('회원 탈퇴가 완료되었습니다');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">설정</h1>
              <p className="text-xs text-gray-400">앱 설정 및 관리</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Notifications Section */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-400 mb-3 px-2">알림</h2>
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium text-white">푸시 알림</p>
                  <p className="text-xs text-gray-400">통화 요청, 예약 알림 등</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationEnabled(!notificationEnabled)}
                className={`w-12 h-7 rounded-full transition-all ${
                  notificationEnabled ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-all ${
                    notificationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-400 mb-3 px-2">계정</h2>
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <button
              onClick={() => navigate('/blocked-users')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-all border-b border-gray-700"
            >
              <div className="flex items-center gap-3">
                <Ban className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-white">차단 리스트</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-yellow-400" />
                <span className="font-medium text-white">로그아웃</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-400 mb-3 px-2">지원</h2>
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <button
              onClick={() => navigate('/faq')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-all border-b border-gray-700"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">FAQ</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>

            <button
              onClick={() => navigate('/terms')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-all border-b border-gray-700"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-white">이용약관</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>

            <button
              onClick={() => navigate('/privacy')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-white">개인정보처리방침</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-sm font-bold text-gray-400 mb-3">앱 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">버전</span>
              <span className="text-white font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">최신 업데이트</span>
              <span className="text-white font-medium">2025-01-08</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-red-400 mb-3 px-2">위험 구역</h2>
          <div className="bg-gray-800 rounded-xl border border-red-900/50 overflow-hidden">
            <button
              onClick={handleDeleteAccount}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-900/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <UserX className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <p className="font-medium text-red-400">회원 탈퇴</p>
                  <p className="text-xs text-gray-500">모든 데이터가 삭제됩니다</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 FreeTalk. All rights reserved.</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <GamingBottomNav />
    </div>
  );
};
