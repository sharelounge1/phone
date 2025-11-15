# FreeTalk 메인 화면 기획서

**버전**: 1.0
**최종 수정일**: 2025-11-15
**디자인 레퍼런스**: Tinder, Bumble, Airbnb

---

## 1. 화면 개요

### 화면명
**홈 화면 (HomeScreen)** - `/home`

### 목적
- 사용자가 통화하고 싶은 호스트를 쉽게 탐색하고 선택
- 다양한 필터와 카테고리로 맞춤형 호스트 추천
- 한눈에 포인트 잔액과 알림 확인

### 주요 사용자 플로우
1. 앱 실행 → 로그인 → 메인 화면 진입
2. 추천 호스트 리스트 탐색
3. 카테고리/필터로 호스트 검색
4. 호스트 프로필 카드 클릭 → 상세 페이지 이동
5. "지금 통화" 버튼으로 즉시 통화 요청

---

## 2. 화면 구조

```
┌─────────────────────────────────────────────┐
│ [상단 헤더]                                  │
│  FreeTalk 로고  [포인트]  [알림] [프로필]   │
├─────────────────────────────────────────────┤
│ [검색 바]                                    │
│  🔍 이름, 관심사로 검색...                  │
├─────────────────────────────────────────────┤
│ [카테고리 탭]                                │
│  [전체] [인기] [신규] [한국어] [영어] ...   │
├─────────────────────────────────────────────┤
│ [필터 버튼]                                  │
│  [🎚️ 필터] [💰 요금순] [⭐ 평점순]         │
├─────────────────────────────────────────────┤
│                                              │
│ [호스트 카드 그리드]                         │
│                                              │
│  ┌─────────┐  ┌─────────┐                  │
│  │ 호스트1 │  │ 호스트2 │                  │
│  │  사진   │  │  사진   │                  │
│  │  정보   │  │  정보   │                  │
│  └─────────┘  └─────────┘                  │
│                                              │
│  ┌─────────┐  ┌─────────┐                  │
│  │ 호스트3 │  │ 호스트4 │                  │
│  └─────────┘  └─────────┘                  │
│                                              │
│  ... (무한 스크롤)                          │
│                                              │
├─────────────────────────────────────────────┤
│ [하단 탭 네비게이션]                         │
│  [🏠 탐색] [📅 예약] [📊 히스토리] [👤 MY] │
└─────────────────────────────────────────────┘
```

---

## 3. 컴포넌트 상세 설계

### 3.1. 상단 헤더

#### 레이아웃
```
[FreeTalk 로고]                [10,000P 💎]  [🔔]  [👤]
```

#### 요소
1. **로고 (좌측)**
   - FreeTalk 텍스트 로고 또는 심볼
   - 색상: Indigo-600
   - 폰트: Bold, 20px
   - 클릭 시: 홈으로 스크롤 업

2. **포인트 표시 (우측)**
   - 현재 보유 포인트 표시
   - 포맷: `10,000P 💎`
   - 배경: Indigo-50, 테두리: Indigo-200
   - 클릭 시: 포인트 충전 화면으로 이동
   - 애니메이션: 포인트 변경 시 카운트업 효과

3. **알림 아이콘**
   - 아이콘: Bell
   - 새 알림 시 빨간 점 표시 (Badge)
   - 클릭 시: 알림 목록 드롭다운 또는 알림 페이지

4. **프로필 아이콘**
   - 사용자 프로필 사진 (원형, 32x32px)
   - 클릭 시: 마이페이지로 이동

#### 스타일
```tsx
<header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-indigo-600">FreeTalk</h1>
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">
        <span className="font-semibold text-indigo-700">10,000P</span>
        <span>💎</span>
      </button>
      <button className="relative p-2 hover:bg-gray-100 rounded-full">
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <img src="..." className="w-8 h-8 rounded-full object-cover border-2 border-gray-200" />
    </div>
  </div>
</header>
```

---

### 3.2. 검색 바

#### 레이아웃
```
[🔍] [이름, 관심사로 검색...]
```

#### 기능
- 실시간 검색 (debounce 300ms)
- 이름, 닉네임, 관심사 태그로 검색
- 검색 결과 하이라이트
- 최근 검색어 (로컬 저장)

#### 스타일
```tsx
<div className="max-w-7xl mx-auto px-4 py-4">
  <div className="relative">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="이름, 관심사로 검색..."
      className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-full pl-12 pr-6 py-3 text-gray-900 placeholder:text-gray-400 transition-all duration-200"
    />
  </div>
</div>
```

---

### 3.3. 카테고리 탭

#### 레이아웃 (가로 스크롤)
```
[전체] [🔥 인기] [✨ 신규] [🇰🇷 한국어] [🇺🇸 영어] [🇯🇵 일본어] [💼 비즈니스] [🎬 영화] ...
```

#### 카테고리 목록
1. **전체**: 모든 호스트
2. **인기**: 통화 횟수 또는 별점 높은 순
3. **신규**: 최근 7일 이내 가입
4. **언어별**: 한국어, 영어, 일본어, 중국어 등
5. **관심사별**: 영화, 여행, 비즈니스, 연애, 고민상담 등

#### 상태
- **선택됨**: 배경 Indigo-500, 텍스트 White
- **기본**: 배경 Gray-100, 텍스트 Gray-700
- **호버**: 배경 Gray-200

#### 스타일
```tsx
<div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
  <div className="flex items-center gap-2 min-w-max">
    <button className="bg-indigo-500 text-white px-4 py-2 rounded-full font-medium whitespace-nowrap">
      전체
    </button>
    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium whitespace-nowrap hover:bg-gray-200 transition-colors">
      🔥 인기
    </button>
    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium whitespace-nowrap hover:bg-gray-200 transition-colors">
      ✨ 신규
    </button>
    {/* ... */}
  </div>
</div>
```

---

### 3.4. 필터 & 정렬 바

#### 레이아웃
```
[🎚️ 필터]  [💰 요금순 ▼]  [⭐ 평점순 ▼]
```

#### 필터 옵션
1. **나이 범위**: 슬라이더 (18-60)
2. **성별**: 전체, 남성, 여성
3. **분당 요금**: 슬라이더 (100P-1,000P)
4. **온라인 상태**: 온라인만 보기
5. **언어**: 다중 선택
6. **관심사**: 다중 선택

#### 정렬 옵션
- **인기순**: 통화 횟수 많은 순
- **평점순**: 별점 높은 순
- **요금 낮은순**: 분당 요금 낮은 순
- **요금 높은순**: 분당 요금 높은 순
- **신규순**: 최근 가입 순

#### 스타일
```tsx
<div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
  <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
    <SlidersHorizontal className="w-4 h-4" />
    <span className="font-medium">필터</span>
  </button>
  <select className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors">
    <option>💰 요금순</option>
    <option>⭐ 평점순</option>
    <option>🔥 인기순</option>
    <option>✨ 신규순</option>
  </select>
</div>
```

---

### 3.5. 호스트 프로필 카드 (핵심!)

#### 레이아웃
```
┌──────────────────────────┐
│                          │
│    [프로필 사진]         │
│    (전체 배경)           │
│                          │
├──────────────────────────┤
│ [온라인 상태 배지]       │
│ 홍길동, 25 👤            │
│ ⭐ 4.8 (128) | 💬 256회 │
│                          │
│ "안녕하세요! 즐거운..."  │
│                          │
│ [#영화] [#여행] [#음악]  │
│                          │
│ 💰 300P/분               │
│                          │
│ [💬 지금 통화]           │
└──────────────────────────┘
```

#### 상세 요소

**1. 프로필 사진**
- 크기: 전체 너비, 높이 240px (모바일), 280px (태블릿)
- Object-fit: cover
- Aspect ratio: 4:3
- 호버 시 살짝 확대 (scale-105)

**2. 온라인 상태 배지 (우측 상단)**
- 온라인: 초록색 배지 "온라인 🟢"
- 오프라인: 회색 배지 "오프라인"
- 통화중: 빨간색 배지 "통화중 🔴"
- 위치: 절대 위치, 우측 상단 12px, 12px

**3. 이름 & 기본 정보**
- 형식: `홍길동, 25 👤`
- 폰트: font-semibold, text-lg
- 색상: gray-900

**4. 평점 & 통계**
- 형식: `⭐ 4.8 (128회) | 💬 256회`
- 폰트: text-sm
- 색상: gray-600
- 평점: 소수점 1자리, 후기 개수
- 통화 횟수: 총 통화 완료 횟수

**5. 자기소개**
- 최대 2줄 표시 (line-clamp-2)
- 폰트: text-sm
- 색상: gray-600
- 초과 시 "..." 표시

**6. 관심사 태그**
- 최대 3개 표시
- 배경: indigo-50
- 텍스트: indigo-600
- Border: indigo-100
- 폰트: text-xs, font-medium
- 패딩: px-3 py-1
- 둥근 모서리: rounded-lg

**7. 분당 요금**
- 형식: `💰 300P/분`
- 폰트: text-base, font-semibold
- 색상: rose-600 (강조)

**8. "지금 통화" 버튼**
- 너비: 전체
- 배경: indigo-500
- 호버: indigo-600
- 텍스트: white, font-semibold
- 패딩: py-3
- 둥근 모서리: rounded-xl
- 아이콘: Phone
- 클릭 시: 통화 요청 화면으로 이동

#### 인터랙션
- **클릭**: 호스트 상세 페이지로 이동
- **"지금 통화" 버튼 클릭**: 통화 요청 팝업
- **호버**: 그림자 확대 (shadow-md → shadow-lg)
- **좋아요 버튼** (우측 하단 플로팅): 하트 아이콘

#### 스타일 (완전한 코드)
```tsx
<div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group">
  {/* 프로필 사진 */}
  <div className="relative h-64 overflow-hidden">
    <img
      src="/host-profile.jpg"
      alt="호스트 프로필"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
    {/* 온라인 상태 배지 */}
    <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
      온라인 🟢
    </span>
    {/* 좋아요 버튼 */}
    <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
      <Heart className="w-5 h-5 text-rose-500" />
    </button>
  </div>

  {/* 카드 내용 */}
  <div className="p-4">
    {/* 이름 & 나이 */}
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-900">홍길동, 25</h3>
      <span className="text-sm text-gray-500">👤</span>
    </div>

    {/* 평점 & 통계 */}
    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
      <span className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="font-medium">4.8</span>
        <span className="text-gray-400">(128)</span>
      </span>
      <span className="text-gray-300">|</span>
      <span className="flex items-center gap-1">
        <MessageCircle className="w-4 h-4" />
        <span>256회</span>
      </span>
    </div>

    {/* 자기소개 */}
    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
      안녕하세요! 영화, 여행 이야기 나누는 걸 좋아해요. 편하게 대화해요 😊
    </p>

    {/* 관심사 태그 */}
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-medium border border-indigo-100">
        #영화
      </span>
      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-medium border border-indigo-100">
        #여행
      </span>
      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-medium border border-indigo-100">
        #음악
      </span>
    </div>

    {/* 분당 요금 */}
    <div className="flex items-center justify-between mb-4">
      <span className="text-base font-semibold text-rose-600">💰 300P/분</span>
    </div>

    {/* 통화 요청 버튼 */}
    <button className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md">
      <Phone className="w-5 h-5" />
      <span>지금 통화</span>
    </button>
  </div>
</div>
```

---

### 3.6. 호스트 카드 그리드

#### 레이아웃
- **모바일**: 1열 (grid-cols-1)
- **태블릿**: 2열 (md:grid-cols-2)
- **데스크탑**: 3열 (lg:grid-cols-3)
- **간격**: gap-4 (16px) / md:gap-6 (24px)

#### 무한 스크롤
- 초기 로딩: 12개
- 스크롤 시 추가 12개씩 로드
- 로딩 스피너: 하단 중앙 표시

#### 빈 상태
- 검색 결과 없음 시:
  ```
  🔍
  검색 결과가 없습니다
  다른 키워드로 검색해보세요
  ```

#### 스타일
```tsx
<div className="max-w-7xl mx-auto px-4 py-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {hosts.map(host => (
      <HostCard key={host.id} host={host} />
    ))}
  </div>

  {/* 로딩 스피너 */}
  {loading && (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
    </div>
  )}

  {/* 빈 상태 */}
  {hosts.length === 0 && !loading && (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
      <p className="text-gray-600">다른 키워드로 검색해보세요</p>
    </div>
  )}
</div>
```

---

### 3.7. 하단 탭 네비게이션

#### 레이아웃
```
[🏠 탐색]  [📅 예약]  [📊 히스토리]  [👤 MY]
```

#### 탭 목록
1. **탐색** (Home): 메인 화면
2. **예약** (Reservations): 예약 리스트
3. **히스토리** (History): 통화 히스토리
4. **MY** (Mypage): 마이페이지

#### 상태
- **선택됨**: 아이콘 & 텍스트 Indigo-600
- **기본**: 아이콘 & 텍스트 Gray-400

#### 스타일
```tsx
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-4 gap-1">
      <button className="flex flex-col items-center justify-center py-3 text-indigo-600">
        <Home className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">탐색</span>
      </button>
      <button className="flex flex-col items-center justify-center py-3 text-gray-400 hover:text-gray-600">
        <Calendar className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">예약</span>
      </button>
      <button className="flex flex-col items-center justify-center py-3 text-gray-400 hover:text-gray-600">
        <Clock className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">히스토리</span>
      </button>
      <button className="flex flex-col items-center justify-center py-3 text-gray-400 hover:text-gray-600">
        <User className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">MY</span>
      </button>
    </div>
  </div>
</nav>
```

---

## 4. 반응형 디자인

### 모바일 (< 768px)
- 헤더: 로고 + 포인트 + 알림 + 프로필
- 검색 바: 전체 너비
- 카테고리: 가로 스크롤
- 호스트 카드: 1열
- 하단 탭: 고정

### 태블릿 (768px - 1024px)
- 호스트 카드: 2열
- 패딩 증가 (px-6)

### 데스크탑 (> 1024px)
- 호스트 카드: 3열
- 최대 너비: max-w-7xl
- 중앙 정렬

---

## 5. 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- Lazy loading (viewport 진입 시 로드)
- WebP 포맷
- 반응형 이미지 (srcset)

### 무한 스크롤
- Intersection Observer API
- 스크롤 위치 기억 (뒤로가기 시)

### 캐싱
- React Query로 서버 상태 캐싱
- 5분 캐시 TTL

---

## 6. 접근성 (a11y)

- 모든 버튼에 aria-label
- 이미지에 alt 텍스트
- 키보드 네비게이션 (Tab)
- 포커스 표시 (ring)
- 색상 대비 4.5:1 이상

---

## 7. 에러 처리

### 네트워크 오류
```
⚠️
네트워크 연결을 확인해주세요
[다시 시도]
```

### 서버 오류
```
😓
일시적인 오류가 발생했습니다
잠시 후 다시 시도해주세요
```

---

## 8. 로딩 상태

### 초기 로딩 (Skeleton)
- 호스트 카드 스켈레톤 12개 표시
- 애니메이션: pulse

### 추가 로딩 (무한 스크롤)
- 하단 스피너
- 애니메이션: spin

---

## 참고 이미지 (레퍼런스)

- **Tinder**: 큰 프로필 사진, 스와이프 UX
- **Bumble**: 따뜻한 노란색, 친근한 카드
- **Airbnb**: 깔끔한 그리드, 가격 강조
- **Discord**: 온라인 상태 표시

---

**다음 단계**: 실제 React 컴포넌트 구현 및 Tailwind CSS 스타일링
