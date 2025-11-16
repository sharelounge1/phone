import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, X, Zap, AlertCircle, Star, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockHosts } from '../data/mockHosts';

export const ReservationRequestScreen = () => {
  const { hostId } = useParams<{ hostId: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStartHour, setSelectedStartHour] = useState<number>(14);
  const [selectedEndHour, setSelectedEndHour] = useState<number>(15);
  const [isRequesting, setIsRequesting] = useState(false);

  const userBalance = 10000;
  const requestCost = 200;

  const host = mockHosts.find((h) => h.id === hostId);

  if (!host) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">호스트를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleReservationRequest = async () => {
    setIsRequesting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRequesting(false);
    navigate('/reservations');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = getDaysInMonth(selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">예약 요청</h1>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Host Info */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-4 border-2 border-purple-500/50 mb-6">
          <div className="flex items-center gap-4">
            <img src={host.profileImage} alt={host.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{host.name}</h2>
                <span className="text-gray-400">{host.age}세</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{host.rating}</span>
                <span className="text-gray-500">·</span>
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-purple-400 font-bold">{host.callPricePerMin}P/분</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              날짜 선택
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium min-w-[120px] text-center">
                {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
              </span>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 font-medium py-2">
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;

              const isSelected = day.toDateString() === selectedDate.toDateString();
              const isPast = day < today;
              const isToday = day.toDateString() === today.toDateString();

              return (
                <button
                  key={idx}
                  onClick={() => !isPast && setSelectedDate(day)}
                  disabled={isPast}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    isPast
                      ? 'text-gray-600 cursor-not-allowed'
                      : isSelected
                      ? 'bg-purple-600 text-white'
                      : isToday
                      ? 'bg-gray-700 text-purple-400 hover:bg-gray-600'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            시간대 선택
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">시작 시간</label>
              <select
                value={selectedStartHour}
                onChange={(e) => setSelectedStartHour(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            </div>

            {/* End Time */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">종료 시간</label>
              <select
                value={selectedEndHour}
                onChange={(e) => setSelectedEndHour(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                {hours.filter((h) => h > selectedStartHour).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">
              선택한 시간대: {formatDate(selectedDate)} {selectedStartHour.toString().padStart(2, '0')}:00 ~ {selectedEndHour.toString().padStart(2, '0')}:00
            </p>
          </div>
        </div>

        {/* Price Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            요금 안내
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">예약 요청 비용</span>
              <span className="text-xl font-bold text-purple-400">{requestCost}P</span>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-sm text-yellow-400">
                💡 예약이 확정되면 실제 통화 시간에 따라 포인트가 차감됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleReservationRequest}
            disabled={isRequesting || userBalance < requestCost}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              !isRequesting && userBalance >= requestCost
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isRequesting ? '요청 중...' : '예약 요청하기'}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gray-700 hover:bg-gray-600 text-white transition-all"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
