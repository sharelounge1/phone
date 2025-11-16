import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, X, ChevronLeft } from 'lucide-react';
import { GamingBottomNav } from '../components/layout/GamingBottomNav';
import { mockHosts } from '../data/mockHosts';

interface Reservation {
  id: string;
  hostId: string;
  hostName: string;
  hostImage: string;
  scheduledTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  pricePerMin: number;
}

const mockReservations: Reservation[] = [
  {
    id: 'res-1',
    hostId: '1',
    hostName: '지은',
    hostImage: mockHosts[0].profileImage,
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2시간 후
    status: 'confirmed',
    pricePerMin: 300,
  },
  {
    id: 'res-2',
    hostId: '2',
    hostName: '민준',
    hostImage: mockHosts[1].profileImage,
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간 후
    status: 'pending',
    pricePerMin: 500,
  },
  {
    id: 'res-3',
    hostId: '4',
    hostName: '준호',
    hostImage: mockHosts[3].profileImage,
    scheduledTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2일 전
    status: 'cancelled',
    pricePerMin: 350,
  },
];

export const ReservationsScreen = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingReservations = mockReservations.filter(
    (r) => r.scheduledTime > new Date() && r.status !== 'cancelled'
  );
  const pastReservations = mockReservations.filter(
    (r) => r.scheduledTime <= new Date() || r.status === 'cancelled'
  );

  const formatDateTime = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}월 ${day}일 ${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold">확정</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full font-bold">대기중</span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full font-bold">취소됨</span>;
    }
  };

  const handleCancelReservation = (id: string) => {
    if (confirm('예약을 취소하시겠습니까?')) {
      alert('예약이 취소되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">통화 예약</h1>
              <p className="text-xs text-gray-400">예약 관리</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2">
          <button
            onClick={() => setTab('upcoming')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              tab === 'upcoming'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            다가오는 예약 ({upcomingReservations.length})
          </button>
          <button
            onClick={() => setTab('past')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              tab === 'past'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            지난 예약 ({pastReservations.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingReservations.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 mb-2">예정된 예약이 없습니다</p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium"
                >
                  호스트 둘러보기
                </button>
              </div>
            ) : (
              upcomingReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={reservation.hostImage}
                      alt={reservation.hostName}
                      className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                      onClick={() => navigate(`/profile/${reservation.hostId}`)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{reservation.hostName}</h3>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{formatDateTime(reservation.scheduledTime)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-bold">{reservation.pricePerMin}P/분</span>
                        {reservation.status === 'pending' && (
                          <button
                            onClick={() => handleCancelReservation(reservation.id)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            예약 취소
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'past' && (
          <div className="space-y-4">
            {pastReservations.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">지난 예약이 없습니다</p>
              </div>
            ) : (
              pastReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 opacity-75"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={reservation.hostImage}
                      alt={reservation.hostName}
                      className="w-20 h-20 rounded-lg object-cover grayscale cursor-pointer"
                      onClick={() => navigate(`/profile/${reservation.hostId}`)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-300">{reservation.hostName}</h3>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{formatDateTime(reservation.scheduledTime)}</span>
                      </div>
                      <span className="text-gray-500 font-bold">{reservation.pricePerMin}P/분</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <GamingBottomNav />
    </div>
  );
};
