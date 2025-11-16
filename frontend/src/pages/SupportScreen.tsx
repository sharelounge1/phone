import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Bell, BookOpen, Send } from 'lucide-react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: '포인트',
    question: '포인트 충전은 어떻게 하나요?',
    answer: '마이페이지 > 포인트 충전 메뉴에서 원하는 패키지를 선택하여 충전할 수 있습니다. 결제는 신용카드, 체크카드, 계좌이체를 지원합니다.',
  },
  {
    id: '2',
    category: '포인트',
    question: '포인트 환불이 가능한가요?',
    answer: '충전한 포인트는 사용하지 않은 경우에 한해 7일 이내 100% 환불 가능합니다. 단, 일부라도 사용한 경우 환불이 불가합니다.',
  },
  {
    id: '3',
    category: '통화',
    question: '통화 요청 비용은 얼마인가요?',
    answer: '1회 통화 요청 시 200P가 차감됩니다. 호스트가 수락하면 통화가 시작되며, 거절되거나 무응답인 경우 포인트가 환불됩니다.',
  },
  {
    id: '4',
    category: '통화',
    question: '통화 중 포인트가 부족하면 어떻게 되나요?',
    answer: '통화 종료 1분 전에 알림이 표시됩니다. 포인트가 0이 되면 자동으로 통화가 종료되니, 미리 충전해 주세요.',
  },
  {
    id: '5',
    category: '호스트',
    question: '호스트 신청 조건은 무엇인가요?',
    answer: '만 19세 이상, 본인 인증 완료, 프로필 사진 3장 이상 등록이 필요합니다. 관리자 검토 후 1~3일 이내 승인 결과를 알려드립니다.',
  },
  {
    id: '6',
    category: '호스트',
    question: '호스트 수익 정산은 언제 되나요?',
    answer: '매월 1일에 전월 수익이 자동으로 등록된 계좌로 입금됩니다. 최소 출금 금액은 10,000원입니다.',
  },
  {
    id: '7',
    category: '기타',
    question: '부적절한 사용자를 신고하려면 어떻게 하나요?',
    answer: '통화 중 또는 프로필 화면에서 신고 버튼을 눌러 신고할 수 있습니다. 관리자가 확인 후 조치를 취합니다.',
  },
  {
    id: '8',
    category: '기타',
    question: '회원 탈퇴는 어떻게 하나요?',
    answer: '마이페이지 > 설정 > 회원 탈퇴에서 가능합니다. 탈퇴 시 포인트는 환불되지 않으니 유의해 주세요.',
  },
];

const notices = [
  {
    id: '1',
    title: '2025년 신년 맞이 포인트 보너스 이벤트',
    date: '2025.01.01',
    isNew: true,
  },
  {
    id: '2',
    title: '호스트 승인 기준 강화 안내',
    date: '2024.12.15',
    isNew: false,
  },
  {
    id: '3',
    title: 'FreeTalk 서비스 오픈 안내',
    date: '2024.12.01',
    isNew: false,
  },
];

export const SupportScreen = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [inquiryText, setInquiryText] = useState('');

  const categories = ['전체', '포인트', '통화', '호스트', '기타'];

  const filteredFAQs = selectedCategory === '전체' ? faqs : faqs.filter((faq) => faq.category === selectedCategory);

  const handleSendInquiry = () => {
    if (!inquiryText.trim()) {
      alert('문의 내용을 입력해주세요.');
      return;
    }
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
    setInquiryText('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-6">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-4">고객센터</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition-colors">
            <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium">이용가이드</p>
          </button>
          <button
            onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition-colors"
          >
            <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium">1:1 문의</p>
          </button>
          <button className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition-colors">
            <Bell className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium">공지사항</p>
          </button>
        </div>

        {/* Notices */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold">공지사항</h3>
          </div>

          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  {notice.isNew && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">NEW</span>
                  )}
                  <p className="font-medium text-white">{notice.title}</p>
                </div>
                <p className="text-xs text-gray-500">{notice.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold">자주 묻는 질문</h3>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-2">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-gray-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start gap-3 text-left">
                    <span className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded font-bold">
                      {faq.category}
                    </span>
                    <p className="font-medium text-white">{faq.question}</p>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 border-t border-gray-600">
                    <p className="text-sm text-gray-300 mt-3 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 1:1 Inquiry */}
        <div id="inquiry" className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold">1:1 문의하기</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">문의 내용</label>
              <textarea
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="문의하실 내용을 상세히 입력해주세요.&#10;&#10;답변은 등록하신 이메일로 발송됩니다."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 min-h-[150px] resize-none"
              />
            </div>

            <button
              onClick={handleSendInquiry}
              className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                <span>문의하기</span>
              </div>
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="font-bold mb-4">운영 시간</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• 평일: 09:00 ~ 18:00</p>
            <p>• 주말 및 공휴일: 휴무</p>
            <p>• 이메일: support@freetalk.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
