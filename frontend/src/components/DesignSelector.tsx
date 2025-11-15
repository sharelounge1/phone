import { Link } from 'react-router-dom';

export const DesignSelector = () => {
  const designs = [
    {
      id: 1,
      name: 'Tinder Style',
      description: '스와이프 카드 & 그라디언트',
      color: 'from-rose-500 to-purple-600',
    },
    {
      id: 2,
      name: 'Stories Style',
      description: '풀스크린 세로 스크롤',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 3,
      name: 'Gaming Style',
      description: '다크모드 & 네온 강조',
      color: 'from-gray-900 to-purple-900',
    },
    {
      id: 4,
      name: 'Bumble Style',
      description: '밝고 친근한 노란색',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 5,
      name: 'Minimal Style',
      description: '심플하고 세련된 클린',
      color: 'from-gray-100 to-gray-300',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">FreeTalk</h1>
          <p className="text-xl text-white/90">5가지 디자인 컨셉 중 하나를 선택하세요</p>
        </div>

        {/* Design Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <Link
              key={design.id}
              to={`/${design.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                {/* Color Preview */}
                <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${design.color} mb-6 group-hover:shadow-lg transition-shadow`}></div>

                {/* Design Info */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    Design {design.id}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {design.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {design.description}
                  </p>
                </div>

                {/* View Button */}
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center gap-2 text-indigo-600 font-medium group-hover:text-indigo-700">
                    미리보기
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-white/80 text-sm">
            각 디자인을 클릭하여 전체 화면으로 확인하세요
          </p>
        </div>
      </div>
    </div>
  );
};
