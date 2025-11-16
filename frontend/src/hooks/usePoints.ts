import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { useAuthStore } from '../stores/authStore';
import { pointService } from '../services/pointService';

export const usePoints = () => {
  const { balance, loadBalance, setBalance } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      loadBalance();

      // 포인트 잔액 실시간 구독
      const channel = pointService.subscribeToBalance(user.id, (newBalance) => {
        setBalance(newBalance);
      });

      return () => {
        channel.unsubscribe();
      };
    }
  }, [user, loadBalance, setBalance]);

  return {
    balance,
    refresh: loadBalance,
    chargePoints: pointService.chargePoints.bind(pointService),
    getTransactions: pointService.getTransactions.bind(pointService),
    requestWithdrawal: pointService.requestWithdrawal.bind(pointService),
  };
};
