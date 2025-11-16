import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, AlertCircle, Clock, CheckCircle, X } from 'lucide-react';

interface WithdrawalHistory {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  requestedAt: Date;
  processedAt?: Date;
  rejectionReason?: string;
}

const mockHistory: WithdrawalHistory[] = [
  {
    id: '1',
    amount: 100000,
    status: 'completed',
    requestedAt: new Date('2025-11-01T10:00:00'),
    processedAt: new Date('2025-11-03T14:30:00'),
  },
  {
    id: '2',
    amount: 50000,
    status: 'pending',
    requestedAt: new Date('2025-11-15T16:20:00'),
  },
];

export const WithdrawalScreen = () => {
  const navigate = useNavigate();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  // Mock data
  const currentPoints = 320000;
  const registeredBank = 'KB국민은행';
  const registeredAccount = '123-456-789012';
  const minWithdrawal = 10000;

  const handleQuickAmount = (amount: number) => {
    setWithdrawalAmount(amount.toString());
  };

  const handleWithdrawal = () => {
    const amount = parseInt(withdrawalAmount);

    if (!amount || amount < minWithdrawal) {
      alert(`최소 출금 금액은 ${minWithdrawal.toLocaleString()}원입니다.`);
      return;
    }

    if (amount > currentPoints) {
      alert('출금 가능한 금액을 초과했습니다.');
      return;
    }

    if (amount % 10000 !== 0) {
      alert('1만원 단위로만 출금 가능합니다.');
      return;
    }

    alert('출금 신청이 완료되었습니다. 영업일 기준 1~3일 내에 입금됩니다.');
    setWithdrawalAmount('');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: WithdrawalHistory['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-bold rounded-full flex items-center gap-1">
            <Clock className="w-4 h-4" />
            처리 중
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-bold rounded-full flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            완료
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full flex items-center gap-1">
            <X className="w-4 h-4" />
            반려
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">출금 신청</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-purple-500/50">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold">출금 가능 금액</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">{currentPoints.toLocaleString()}</span>
            <span className="text-xl text-gray-400">P</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            = {currentPoints.toLocaleString()}원 (1P = 1원)
          </p>
        </div>

        {/* Registered Account */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">등록된 계좌</h3>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">은행</p>
            <p className="text-white font-medium mb-3">{registeredBank}</p>
            <p className="text-gray-400 text-sm mb-1">계좌번호</p>
            <p className="text-white font-medium">{registeredAccount}</p>
          </div>
          <button className="mt-3 text-purple-400 hover:text-purple-300 text-sm font-medium">
            계좌 변경하기
          </button>
        </div>

        {/* Withdrawal Form */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">출금 금액 입력</h3>

          <div className="mb-4">
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              placeholder="출금할 금액을 입력하세요"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-2">* 1만원 단위로만 출금 가능합니다.</p>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[10000, 50000, 100000, currentPoints].map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmount(amount)}
                className="py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
              >
                {amount === currentPoints ? '전체' : `${(amount / 10000).toFixed(0)}만원`}
              </button>
            ))}
          </div>

          {/* Info Alert */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-medium mb-1">출금 안내</p>
                <ul className="space-y-1 text-xs text-blue-400">
                  <li>• 최소 출금 금액: 10,000원</li>
                  <li>• 출금 수수료: 무료</li>
                  <li>• 처리 시간: 영업일 기준 1~3일</li>
                  <li>• 출금 가능 시간: 평일 09:00 ~ 18:00</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Withdrawal Button */}
          <button
            onClick={handleWithdrawal}
            disabled={!withdrawalAmount || parseInt(withdrawalAmount) < minWithdrawal}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              withdrawalAmount && parseInt(withdrawalAmount) >= minWithdrawal
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            출금 신청하기
          </button>
        </div>

        {/* Withdrawal History */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">출금 내역</h3>

          {mockHistory.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">출금 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xl font-bold text-white mb-1">{item.amount.toLocaleString()}원</p>
                      <p className="text-sm text-gray-400">신청일: {formatDate(item.requestedAt)}</p>
                      {item.processedAt && (
                        <p className="text-sm text-gray-400">처리일: {formatDate(item.processedAt)}</p>
                      )}
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {item.status === 'rejected' && item.rejectionReason && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                      <p className="text-sm text-red-400">반려 사유: {item.rejectionReason}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
