import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, BarChart3 } from 'lucide-react';

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    reviewerName: '익명',
    rating: 5,
    comment: '정말 좋은 대화였어요! 다음에 또 통화하고 싶습니다 😊',
    createdAt: '2시간 전',
  },
  {
    id: '2',
    reviewerName: '익명',
    rating: 5,
    comment: '친절하고 재미있었습니다. 시간 가는 줄 몰랐어요!',
    createdAt: '5시간 전',
  },
  {
    id: '3',
    reviewerName: '익명',
    rating: 4,
    comment: '편하게 대화할 수 있어서 좋았어요.',
    createdAt: '1일 전',
  },
  {
    id: '4',
    reviewerName: '익명',
    rating: 5,
    comment: '경청을 잘해주셔서 감사했습니다. 스트레스가 많이 풀렸어요.',
    createdAt: '1일 전',
  },
  {
    id: '5',
    reviewerName: '익명',
    rating: 4,
    comment: '좋은 시간이었어요. 추천합니다!',
    createdAt: '2일 전',
  },
  {
    id: '6',
    reviewerName: '익명',
    rating: 5,
    comment: '진짜 친절하시고 대화가 재미있어요. 또 통화할게요!',
    createdAt: '2일 전',
  },
  {
    id: '7',
    reviewerName: '익명',
    rating: 3,
    comment: '괜찮았습니다.',
    createdAt: '3일 전',
  },
  {
    id: '8',
    reviewerName: '익명',
    rating: 5,
    comment: '영화 이야기 나누는 게 너무 즐거웠어요. 취향이 잘 맞아서 좋았습니다.',
    createdAt: '3일 전',
  },
  {
    id: '9',
    reviewerName: '익명',
    rating: 4,
    comment: '좋은 조언 감사합니다!',
    createdAt: '4일 전',
  },
  {
    id: '10',
    reviewerName: '익명',
    rating: 5,
    comment: '최고예요! 정말 행복한 시간이었습니다 💕',
    createdAt: '5일 전',
  },
];

export const HostReviewsScreen = () => {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const averageRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);
  const totalReviews = mockReviews.length;

  const ratingCounts = {
    5: mockReviews.filter((r) => r.rating === 5).length,
    4: mockReviews.filter((r) => r.rating === 4).length,
    3: mockReviews.filter((r) => r.rating === 3).length,
    2: mockReviews.filter((r) => r.rating === 2).length,
    1: mockReviews.filter((r) => r.rating === 1).length,
  };

  const filteredReviews =
    selectedRating === 'all' ? mockReviews : mockReviews.filter((r) => r.rating === selectedRating);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">받은 후기</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Rating Summary */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border-2 border-purple-500/50">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                <span className="text-5xl font-bold text-white">{averageRating}</span>
              </div>
              <p className="text-gray-400 text-sm">평균 별점</p>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <p className="text-gray-300">총 {totalReviews}개의 후기</p>
              </div>
              <p className="text-sm text-gray-400">
                {((ratingCounts[5] / totalReviews) * 100).toFixed(0)}%가 5점을 주었어요!
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating as keyof typeof ratingCounts];
              const percentage = (count / totalReviews) * 100;

              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-gray-300">{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right">{count}개</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold">별점 필터</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedRating('all')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedRating === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              전체 ({totalReviews})
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedRating === rating
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{rating}점</span>
                <span className="text-xs">({ratingCounts[rating as keyof typeof ratingCounts]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">후기 목록 ({filteredReviews.length}개)</h3>

          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">해당하는 후기가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-white">{review.reviewerName}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2 leading-relaxed">{review.comment}</p>
                  <p className="text-xs text-gray-500">{review.createdAt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
