import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Zap, CreditCard, Check } from 'lucide-react';
import { GamingBottomNav } from '../components/layout/GamingBottomNav';

interface ChargePackage {
  id: string;
  amount: number;
  points: number;
  bonus: number;
  popular?: boolean;
}

const chargePackages: ChargePackage[] = [
  {
    id: 'package-1',
    amount: 10000,
    points: 10000,
    bonus: 0,
  },
  {
    id: 'package-2',
    amount: 30000,
    points: 40000,
    bonus: 10000,
    popular: true,
  },
  {
    id: 'package-3',
    amount: 100000,
    points: 150000,
    bonus: 50000,
  },
];

export const PointChargeScreen = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const currentPoints = 10000; // Mock data

  const handleCharge = () => {
    if (!selectedPackage) {
      alert('충전할 패키지를 선택해주세요');
      return;
    }

    const pkg = chargePackages.find((p) => p.id === selectedPackage);
    if (pkg) {
      alert(`${pkg.amount.toLocaleString()}원 결제 화면으로 이동 (미구현)\n${pkg.points.toLocaleString()}P가 충전됩니다.`);
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
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">포인트 충전</h1>
              <p className="text-xs text-gray-400">안전한 결제</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Current Balance */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-purple-500/50 backdrop-blur-sm mb-6">
          <p className="text-sm text-gray-400 mb-2">현재 포인트</p>
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-emerald-400 fill-emerald-400" />
            <span className="text-4xl font-bold text-emerald-400">{currentPoints.toLocaleString()}</span>
            <span className="text-2xl text-gray-500">P</span>
          </div>
        </div>

        {/* Package Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-400" />
            충전 패키지 선택
          </h2>

          <div className="space-y-3">
            {chargePackages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`w-full bg-gray-800 rounded-xl p-5 border-2 transition-all ${
                  selectedPackage === pkg.id
                    ? 'border-purple-500 bg-purple-900/30'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-white">
                        {pkg.amount.toLocaleString()}원
                      </span>
                      {pkg.popular && (
                        <span className="px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                          인기
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xl font-bold text-purple-400">
                        {pkg.points.toLocaleString()}P
                      </span>
                      {pkg.bonus > 0 && (
                        <span className="text-sm text-emerald-400 font-bold">
                          (+{pkg.bonus.toLocaleString()}P 보너스)
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPackage === pkg.id
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-600'
                    }`}
                  >
                    {selectedPackage === pkg.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mb-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            포인트 사용 안내
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>통화 요청 시 200P가 차감됩니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>통화 시간은 호스트별 분당 요금이 적용됩니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>충전된 포인트는 환불이 불가능합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>보너스 포인트는 프로모션에 따라 변경될 수 있습니다</span>
            </li>
          </ul>
        </div>

        {/* Charge Button */}
        <button
          onClick={handleCharge}
          disabled={!selectedPackage}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            selectedPackage
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedPackage ? (
            <>
              {chargePackages.find((p) => p.id === selectedPackage)?.amount.toLocaleString()}원 결제하기
            </>
          ) : (
            '패키지를 선택해주세요'
          )}
        </button>

        {/* Payment Methods */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">결제 수단</p>
          <div className="flex justify-center gap-4">
            <span className="text-xs text-gray-400">신용카드</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">계좌이체</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">간편결제</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <GamingBottomNav />
    </div>
  );
};
