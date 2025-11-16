import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Image as ImageIcon } from 'lucide-react';

interface HostApplication {
  id: string;
  userId: string;
  nickname: string;
  age: number;
  gender: string;
  profileImages: string[];
  introduction: string;
  languages: string[];
  interests: string[];
  callPricePerMin: number;
  bankName: string;
  accountNumber: string;
  appliedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

const mockApplications: HostApplication[] = [
  {
    id: '1',
    userId: 'user1',
    nickname: '지은',
    age: 25,
    gender: '여성',
    profileImages: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    ],
    introduction: '안녕하세요! 영화, 여행 이야기 나누는 걸 좋아해요. 편하게 대화해요 😊',
    languages: ['한국어', '영어'],
    interests: ['영화', '여행', '음악'],
    callPricePerMin: 300,
    bankName: 'KB국민은행',
    accountNumber: '123-456-789012',
    appliedAt: new Date('2025-11-15T14:30:00'),
    status: 'pending',
  },
  {
    id: '2',
    userId: 'user2',
    nickname: '민준',
    age: 28,
    gender: '남성',
    profileImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    ],
    introduction: '비즈니스, 커리어 고민 상담해드려요. 경청하는 것을 좋아합니다 👂',
    languages: ['한국어', '영어', '일본어'],
    interests: ['비즈니스', '자기계발', '독서'],
    callPricePerMin: 500,
    bankName: '신한은행',
    accountNumber: '110-123-456789',
    appliedAt: new Date('2025-11-14T10:20:00'),
    status: 'pending',
  },
];

export const AdminHostApprovalScreen = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(mockApplications);
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: string]: number }>({});

  const handleApprove = (applicationId: string) => {
    if (confirm('이 신청을 승인하시겠습니까?')) {
      setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: 'approved' as const } : app)));
      alert('승인되었습니다.');
    }
  };

  const handleReject = (applicationId: string) => {
    const reason = prompt('반려 사유를 입력해주세요:');
    if (reason) {
      setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: 'rejected' as const } : app)));
      alert('반려되었습니다.');
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

  const pendingApplications = applications.filter((app) => app.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">호스트 승인 관리</h1>
          {pendingApplications.length > 0 && (
            <span className="ml-3 px-2 py-1 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full">
              {pendingApplications.length}건 대기
            </span>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {pendingApplications.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
            <Check className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">대기 중인 신청이 없습니다</p>
          </div>
        ) : (
          pendingApplications.map((app) => (
            <div
              key={app.id}
              className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-xl p-6 border border-gray-700"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{app.nickname}</h3>
                    <span className="text-gray-400">{app.age}세</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg">{app.gender}</span>
                  </div>
                  <p className="text-sm text-gray-500">신청일: {formatDate(app.appliedAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">희망 요금</p>
                  <p className="text-2xl font-bold text-purple-400">{app.callPricePerMin}P/분</p>
                </div>
              </div>

              {/* Profile Images */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                  <h4 className="font-bold">프로필 사진</h4>
                  <span className="text-sm text-gray-500">({app.profileImages.length}장)</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {app.profileImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square">
                      <img
                        src={img}
                        alt={`Profile ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() =>
                          setSelectedImageIndex({ ...selectedImageIndex, [app.id]: idx })
                        }
                      />
                      <span className="absolute top-2 left-2 px-2 py-1 bg-gray-900/80 text-white text-xs rounded">
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Introduction */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h4 className="font-bold mb-2">자기소개</h4>
                <p className="text-gray-300 leading-relaxed">{app.introduction}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Languages */}
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-bold mb-3">사용 가능 언어</h4>
                  <div className="flex gap-2 flex-wrap">
                    {app.languages.map((lang, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-bold mb-3">관심사</h4>
                  <div className="flex gap-2 flex-wrap">
                    {app.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-lg border border-purple-500/30"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bank Account */}
                <div className="bg-gray-700/50 rounded-lg p-4 md:col-span-2">
                  <h4 className="font-bold mb-3">정산 계좌</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">은행</p>
                      <p className="text-white">{app.bankName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">계좌번호</p>
                      <p className="text-white">{app.accountNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(app.id)}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>승인</span>
                  </div>
                </button>

                <button
                  onClick={() => handleReject(app.id)}
                  className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl font-bold transition-all shadow-lg shadow-red-500/30"
                >
                  <div className="flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
                    <span>반려</span>
                  </div>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
