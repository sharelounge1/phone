import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Zap, Gift, Phone, Calendar } from 'lucide-react';

type TransactionType = 'all' | 'charge' | 'use' | 'earn';

interface Transaction {
  id: string;
  type: 'charge' | 'use' | 'earn';
  amount: number;
  description: string;
  date: Date;
  balance: number;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'charge',
    amount: 40000,
    description: '포인트 충전 (30,000원 패키지)',
    date: new Date('2025-11-15T14:30:00'),
    balance: 50000,
  },
  {
    id: '2',
    type: 'use',
    amount: -200,
    description: '통화 요청 (지은님)',
    date: new Date('2025-11-14T18:20:00'),
    balance: 10000,
  },
  {
    id: '3',
    type: 'use',
    amount: -1500,
    description: '통화 사용 (지은님, 5분)',
    date: new Date('2025-11-14T18:25:00'),
    balance: 9800,
  },
  {
    id: '4',
    type: 'earn',
    amount: 500,
    description: '친구 초대 보너스',
    date: new Date('2025-11-13T10:00:00'),
    balance: 11300,
  },
  {
    id: '5',
    type: 'use',
    amount: -200,
    description: '예약 요청 (민준님)',
    date: new Date('2025-11-12T16:45:00'),
    balance: 10800,
  },
  {
    id: '6',
    type: 'charge',
    amount: 10000,
    description: '포인트 충전 (10,000원 패키지)',
    date: new Date('2025-11-10T12:00:00'),
    balance: 11000,
  },
  {
    id: '7',
    type: 'use',
    amount: -2400,
    description: '통화 사용 (준호님, 8분)',
    date: new Date('2025-11-09T20:15:00'),
    balance: 1000,
  },
  {
    id: '8',
    type: 'earn',
    amount: 1000,
    description: '가입 축하 보너스',
    date: new Date('2025-11-08T09:00:00'),
    balance: 3400,
  },
];

export const PointTransactionScreen = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<TransactionType>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | '1week' | '1month' | '3months'>('all');

  const filterTransactions = () => {
    let filtered = mockTransactions;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter((t) => t.type === selectedType);
    }

    // Filter by period
    const now = new Date();
    if (selectedPeriod === '1week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((t) => t.date >= weekAgo);
    } else if (selectedPeriod === '1month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((t) => t.date >= monthAgo);
    } else if (selectedPeriod === '3months') {
      const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((t) => t.date >= threeMonthsAgo);
    }

    return filtered;
  };

  const filteredTransactions = filterTransactions();

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'charge':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'use':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      case 'earn':
        return <Gift className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'charge':
        return 'text-emerald-400';
      case 'use':
        return 'text-red-400';
      case 'earn':
        return 'text-yellow-400';
    }
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

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">포인트 사용내역</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Filter Tabs */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'all' as const, label: '전체' },
              { value: 'charge' as const, label: '충전' },
              { value: 'use' as const, label: '사용' },
              { value: 'earn' as const, label: '적립' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedType(tab.value)}
                className={`py-2 rounded-lg font-medium transition-all ${
                  selectedType === tab.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Period Filter */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold">기간 선택</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'all' as const, label: '전체' },
              { value: '1week' as const, label: '1주일' },
              { value: '1month' as const, label: '1개월' },
              { value: '3months' as const, label: '3개월' },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`py-2 rounded-lg font-medium transition-all ${
                  selectedPeriod === period.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-2 border-purple-500/50">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h3 className="font-bold">선택 기간 요약</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-900/30 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">충전</p>
              <p className="text-xl font-bold text-emerald-400">
                +
                {filteredTransactions
                  .filter((t) => t.type === 'charge')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
                P
              </p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">사용</p>
              <p className="text-xl font-bold text-red-400">
                {filteredTransactions
                  .filter((t) => t.type === 'use')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
                P
              </p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">적립</p>
              <p className="text-xl font-bold text-yellow-400">
                +
                {filteredTransactions
                  .filter((t) => t.type === 'earn')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
                P
              </p>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h3 className="font-bold mb-4">거래 내역 ({filteredTransactions.length}건)</h3>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Phone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">선택한 기간에 거래 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">{getTransactionIcon(transaction.type)}</div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white mb-1">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                    </div>

                    <div className="text-right">
                      <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount.toLocaleString()}P
                      </p>
                      <p className="text-xs text-gray-500">잔액 {transaction.balance.toLocaleString()}P</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Charge Button */}
        <button
          onClick={() => navigate('/point/charge')}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50 transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            <span>포인트 충전하기</span>
          </div>
        </button>
      </div>
    </div>
  );
};
