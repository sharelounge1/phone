import { useNavigate } from 'react-router-dom';
import { LogIn, Eye } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const LoginRequiredModal = ({ isOpen, onClose, message }: LoginRequiredModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/login');
  };

  const handleContinueBrowsing = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border-2 border-purple-500/50 shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-3">
          로그인이 필요합니다
        </h2>

        {/* Message */}
        <p className="text-gray-300 text-center mb-8">
          {message || '이 기능을 사용하려면 로그인이 필요합니다.'}
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          {/* 로그인하기 버튼 */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            로그인하기
          </button>

          {/* 계속 둘러보기 버튼 */}
          <button
            onClick={handleContinueBrowsing}
            className="w-full bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            계속 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
};
