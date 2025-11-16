import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Ban, CheckCircle, User } from 'lucide-react';

interface UserData {
  id: string;
  nickname: string;
  email: string;
  profileImage: string;
  isHost: boolean;
  joinedAt: Date;
  totalCalls: number;
  status: 'active' | 'suspended';
}

const mockUsers: UserData[] = [
  {
    id: '1',
    nickname: '지은',
    email: 'jieun@example.com',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    isHost: true,
    joinedAt: new Date('2024-12-01'),
    totalCalls: 256,
    status: 'active',
  },
  {
    id: '2',
    nickname: '민준',
    email: 'minjun@example.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    isHost: true,
    joinedAt: new Date('2024-11-15'),
    totalCalls: 512,
    status: 'active',
  },
  {
    id: '3',
    nickname: '서연',
    email: 'seoyeon@example.com',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    isHost: false,
    joinedAt: new Date('2025-01-05'),
    totalCalls: 34,
    status: 'active',
  },
  {
    id: '4',
    nickname: '준호',
    email: 'junho@example.com',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    isHost: true,
    joinedAt: new Date('2024-10-20'),
    totalCalls: 334,
    status: 'suspended',
  },
  {
    id: '5',
    nickname: '유진',
    email: 'yujin@example.com',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    isHost: false,
    joinedAt: new Date('2025-01-10'),
    totalCalls: 12,
    status: 'active',
  },
];

export const AdminUsersScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'host' | 'user' | 'suspended'>('all');

  const handleSuspend = (userId: string) => {
    if (confirm('이 사용자를 정지하시겠습니까?')) {
      setUsers(users.map((u) => (u.id === userId ? { ...u, status: 'suspended' as const } : u)));
      alert('사용자가 정지되었습니다.');
    }
  };

  const handleUnsuspend = (userId: string) => {
    if (confirm('이 사용자의 정지를 해제하시겠습니까?')) {
      setUsers(users.map((u) => (u.id === userId ? { ...u, status: 'active' as const } : u)));
      alert('정지가 해제되었습니다.');
    }
  };

  const filteredUsers = users.filter((user) => {
    // Search filter
    const matchesSearch =
      user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    let matchesType = true;
    if (filterType === 'host') matchesType = user.isHost;
    else if (filterType === 'user') matchesType = !user.isHost;
    else if (filterType === 'suspended') matchesType = user.status === 'suspended';

    return matchesSearch && matchesType;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">유저 관리</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Search & Filter */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="닉네임 또는 이메일로 검색"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'all' as const, label: '전체', count: users.length },
              { value: 'host' as const, label: '호스트', count: users.filter((u) => u.isHost).length },
              { value: 'user' as const, label: '일반', count: users.filter((u) => !u.isHost).length },
              {
                value: 'suspended' as const,
                label: '정지',
                count: users.filter((u) => u.status === 'suspended').length,
              },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={`py-2 rounded-lg font-medium transition-all ${
                  filterType === filter.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h3 className="font-bold mb-4">사용자 목록 ({filteredUsers.length}명)</h3>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors ${
                    user.status === 'suspended' ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Profile Image */}
                    <img src={user.profileImage} alt={user.nickname} className="w-16 h-16 rounded-lg object-cover" />

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-white">{user.nickname}</h4>
                        {user.isHost && (
                          <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded">호스트</span>
                        )}
                        {user.status === 'suspended' && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">정지</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{user.email}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>가입: {formatDate(user.joinedAt)}</span>
                        <span>·</span>
                        <span>통화: {user.totalCalls}회</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleSuspend(user.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-colors text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Ban className="w-4 h-4" />
                            <span>정지</span>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnsuspend(user.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>해제</span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
