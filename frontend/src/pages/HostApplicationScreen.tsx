import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, AlertCircle, CheckCircle, Clock, Ban } from 'lucide-react';

type ApplicationStatus = 'none' | 'pending' | 'approved' | 'rejected';

export const HostApplicationScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ApplicationStatus>('none'); // 실제로는 서버에서 가져옴

  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    bankName: '',
    accountNumber: '',
    pricePerMin: '300',
    introduction: '',
    languages: [] as string[],
    interests: [] as string[],
    availableTimeRanges: [] as string[],
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const availableLanguages = ['한국어', '영어', '일본어', '중국어', '스페인어', '프랑스어'];
  const availableInterests = ['영화', '여행', '음악', '게임', '운동', '독서', '요리', '패션', '비즈니스', '고민상담'];
  const timeRanges = ['오전 (06:00-12:00)', '오후 (12:00-18:00)', '저녁 (18:00-24:00)', '심야 (00:00-06:00)'];
  const banks = ['KB국민은행', '신한은행', '우리은행', '하나은행', '농협은행', 'IBK기업은행', '카카오뱅크', '토스뱅크'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Mock image upload
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.gender || !formData.age || !formData.bankName || !formData.accountNumber) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    if (uploadedImages.length < 3) {
      alert('프로필 사진을 최소 3장 이상 업로드해주세요.');
      return;
    }
    if (formData.introduction.length < 50) {
      alert('자기소개를 최소 50자 이상 입력해주세요.');
      return;
    }

    // Submit
    setStatus('pending');
  };

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold ml-4">호스트 신청</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <Clock className="w-20 h-20 text-yellow-400 mb-6" />
          <h2 className="text-2xl font-bold mb-4">신청이 접수되었습니다</h2>
          <p className="text-gray-400 text-center mb-8">
            관리자 검토 후 1~3일 이내에 승인 결과를 알려드립니다.
            <br />
            승인되면 앱 내 알림으로 안내해드릴게요!
          </p>
          <button
            onClick={() => navigate('/mypage')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors"
          >
            마이페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold ml-4">호스트 신청</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
          <h2 className="text-2xl font-bold mb-4">승인되었습니다! 🎉</h2>
          <p className="text-gray-400 text-center mb-8">
            호스트로 활동하실 수 있습니다.
            <br />
            지금 바로 통화를 받아보세요!
          </p>
          <button
            onClick={() => navigate('/host/dashboard')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold transition-colors"
          >
            호스트 대시보드로 이동
          </button>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold ml-4">호스트 신청</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <Ban className="w-20 h-20 text-red-400 mb-6" />
          <h2 className="text-2xl font-bold mb-4">신청이 반려되었습니다</h2>
          <p className="text-gray-400 text-center mb-8">
            프로필 정보가 부족하거나 가이드라인에 맞지 않습니다.
            <br />
            내용을 수정하여 다시 신청해주세요.
          </p>
          <button
            onClick={() => setStatus('none')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors"
          >
            다시 신청하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">호스트 신청</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4">
          <p className="text-purple-300 text-sm">
            호스트로 활동하려면 프로필 검수가 필요합니다. 모든 정보를 정확히 입력해주세요.
          </p>
        </div>

        {/* Profile Images */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-2">프로필 사진 (최소 3장)</h3>
          <p className="text-sm text-gray-400 mb-4">얼굴이 잘 보이는 사진을 등록해주세요.</p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {uploadedImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square">
                <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover rounded-lg" />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {uploadedImages.length < 5 && (
            <label className="block">
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p className="text-sm text-gray-400">사진 업로드 ({uploadedImages.length}/5)</p>
              </div>
            </label>
          )}
        </div>

        {/* Basic Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">기본 정보</h3>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">성별 *</label>
            <div className="flex gap-3">
              {['남성', '여성', '기타'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setFormData({ ...formData, gender })}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    formData.gender === gender
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">나이 *</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="나이를 입력하세요"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
          <h3 className="text-lg font-bold mb-4">정산 계좌</h3>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">은행 *</label>
            <select
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">은행 선택</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">계좌번호 *</label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="'-' 없이 숫자만 입력"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Price Setting */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">분당 통화 요금 설정 *</h3>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={formData.pricePerMin}
            onChange={(e) => setFormData({ ...formData, pricePerMin: e.target.value })}
            className="w-full mb-4"
          />
          <div className="text-center">
            <span className="text-3xl font-bold text-purple-400">{formData.pricePerMin}P</span>
            <span className="text-gray-500 ml-2">/분</span>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">권장: 200P ~ 500P</p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-2">자기소개 * (최소 50자)</h3>
          <p className="text-sm text-gray-400 mb-4">어떤 대화를 나누고 싶은지 소개해주세요.</p>
          <textarea
            value={formData.introduction}
            onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
            placeholder="예) 안녕하세요! 영화, 여행 이야기 나누는 걸 좋아해요. 편하게 대화해요 😊"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 min-h-[120px] resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">{formData.introduction.length} / 50자 이상</p>
        </div>

        {/* Languages */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">사용 가능 언어</h3>
          <div className="flex gap-2 flex-wrap">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleArrayItem(formData.languages, lang, (v) => setFormData({ ...formData, languages: v }))}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  formData.languages.includes(lang)
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
          <h3 className="text-lg font-bold mb-4">관심사 태그</h3>
          <div className="flex gap-2 flex-wrap">
            {availableInterests.map((interest) => (
              <button
                key={interest}
                onClick={() =>
                  toggleArrayItem(formData.interests, interest, (v) => setFormData({ ...formData, interests: v }))
                }
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  formData.interests.includes(interest)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Available Time */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">통화 가능 시간대</h3>
          <div className="space-y-2">
            {timeRanges.map((time) => (
              <label key={time} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.availableTimeRanges.includes(time)}
                  onChange={() =>
                    toggleArrayItem(formData.availableTimeRanges, time, (v) =>
                      setFormData({ ...formData, availableTimeRanges: v })
                    )
                  }
                  className="w-5 h-5 accent-purple-600"
                />
                <span className="text-gray-300">{time}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Warning */}
        {uploadedImages.length < 3 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">프로필 사진을 최소 3장 이상 업로드해주세요.</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/50 transition-all"
        >
          신청하기
        </button>
      </div>
    </div>
  );
};
