import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { HostCard } from '../../common/HostCard';
import { mockHosts } from '../../../data/mockHosts';

export const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    '전체',
    '🔥 인기',
    '✨ 신규',
    '🇰🇷 한국어',
    '🇺🇸 영어',
    '🇯🇵 일본어',
    '💼 비즈니스',
    '🎬 영화',
    '💕 연애',
  ];

  return (
    <div className="pb-20">
      {/* 검색 바 */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="이름, 관심사로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-full pl-12 pr-6 py-3 text-gray-900 placeholder:text-gray-400 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 & 정렬 */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-medium">필터</span>
        </button>
        <select className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer outline-none">
          <option>💰 요금순</option>
          <option>⭐ 평점순</option>
          <option>🔥 인기순</option>
          <option>✨ 신규순</option>
        </select>
      </div>

      {/* 호스트 카드 그리드 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mockHosts.map((host) => (
            <HostCard
              key={host.id}
              host={host}
              onClick={() => {
                console.log('Navigate to host detail:', host.id);
              }}
              onCallClick={() => {
                console.log('Call request to:', host.name);
                alert(`${host.name}님에게 통화 요청을 보냅니다!`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
