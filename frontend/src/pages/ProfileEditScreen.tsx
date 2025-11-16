import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Save } from 'lucide-react';

export const ProfileEditScreen = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    nickname: '홍길동',
    introduction: '안녕하세요! 영화, 여행 이야기 나누는 걸 좋아해요. 편하게 대화해요 😊',
    languages: ['한국어', '영어'] as string[],
    interests: ['영화', '여행', '음악'] as string[],
  });

  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop');
  const [isSaving, setIsSaving] = useState(false);

  const availableLanguages = ['한국어', '영어', '일본어', '중국어', '스페인어', '프랑스어'];
  const availableInterests = [
    '영화',
    '여행',
    '음악',
    '게임',
    '운동',
    '독서',
    '요리',
    '패션',
    'K-POP',
    '드라마',
    '비즈니스',
    '고민상담',
    '언어교환',
    '자기계발',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleSave = async () => {
    if (!profileData.nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (profileData.languages.length === 0) {
      alert('사용 가능한 언어를 최소 1개 선택해주세요.');
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);

    alert('프로필이 저장되었습니다.');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold ml-4">프로필 수정</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Image */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">프로필 사진</h3>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-500 transition-colors">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Upload className="w-5 h-5" />
              </label>
            </div>
            <p className="text-sm text-gray-400">사진을 클릭하여 변경하세요</p>
          </div>
        </div>

        {/* Nickname */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">닉네임</h3>
          <input
            type="text"
            value={profileData.nickname}
            onChange={(e) => setProfileData({ ...profileData, nickname: e.target.value })}
            placeholder="닉네임을 입력하세요"
            maxLength={20}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          />
          <p className="text-xs text-gray-500 mt-2">{profileData.nickname.length} / 20자</p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">자기소개</h3>
          <textarea
            value={profileData.introduction}
            onChange={(e) => setProfileData({ ...profileData, introduction: e.target.value })}
            placeholder="자기소개를 입력하세요"
            maxLength={200}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 min-h-[120px] resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">{profileData.introduction.length} / 200자</p>
        </div>

        {/* Languages */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-2">사용 가능 언어</h3>
          <p className="text-sm text-gray-400 mb-4">최소 1개 이상 선택해주세요</p>

          <div className="flex gap-2 flex-wrap">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() =>
                  toggleArrayItem(profileData.languages, lang, (v) => setProfileData({ ...profileData, languages: v }))
                }
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  profileData.languages.includes(lang)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-2">관심사 태그</h3>
          <p className="text-sm text-gray-400 mb-4">나를 표현하는 태그를 선택하세요</p>

          <div className="flex gap-2 flex-wrap">
            {availableInterests.map((interest) => (
              <button
                key={interest}
                onClick={() =>
                  toggleArrayItem(profileData.interests, interest, (v) => setProfileData({ ...profileData, interests: v }))
                }
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  profileData.interests.includes(interest)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            isSaving
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            <span>{isSaving ? '저장 중...' : '저장하기'}</span>
          </div>
        </button>
      </div>
    </div>
  );
};
