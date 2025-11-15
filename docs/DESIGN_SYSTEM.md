# FreeTalk 디자인 시스템

**버전**: 1.0
**최종 수정일**: 2025-11-15

## 디자인 철학

FreeTalk은 **따뜻한 연결**과 **신뢰할 수 있는 소통**을 지향합니다.

### 핵심 가치
- **친근함**: 누구나 편안하게 접근할 수 있는 따뜻한 디자인
- **신뢰성**: 안전하고 믿을 수 있는 플랫폼 이미지
- **명료함**: 복잡하지 않은, 직관적인 사용자 경험
- **활기**: 즐거운 대화를 위한 생동감 있는 인터페이스

---

## 색상 시스템 (Color Palette)

### Primary Colors

#### Indigo (주 색상)
**용도**: 브랜드 정체성, 주요 액션 버튼, 네비게이션
- `indigo-50`: `#eef2ff` - 배경, 호버 상태
- `indigo-100`: `#e0e7ff` - 카드 배경
- `indigo-500`: `#6366f1` - 기본 버튼, 링크
- `indigo-600`: `#4f46e5` - 버튼 호버
- `indigo-700`: `#4338ca` - 버튼 활성
- `indigo-900`: `#312e81` - 텍스트 강조

**심리**: 신뢰, 전문성, 안정감, 커뮤니케이션

#### Rose (보조 색상)
**용도**: 호스트 강조, 좋아요, 특별 기능
- `rose-50`: `#fff1f2` - 배경
- `rose-100`: `#ffe4e6` - 카드 배경
- `rose-500`: `#f43f5e` - 강조 버튼
- `rose-600`: `#e11d48` - 버튼 호버
- `rose-700`: `#be123c` - 버튼 활성

**심리**: 따뜻함, 친밀함, 열정

### Functional Colors

#### Success (성공, 연결)
- `emerald-500`: `#10b981` - 통화 수락, 성공 메시지
- `emerald-600`: `#059669` - 호버 상태

#### Warning (경고, 주의)
- `amber-500`: `#f59e0b` - 포인트 부족 경고
- `amber-600`: `#d97706` - 호버 상태

#### Error (오류, 거절)
- `red-500`: `#ef4444` - 거절, 오류 메시지
- `red-600`: `#dc2626` - 호버 상태

#### Info (정보)
- `blue-500`: `#3b82f6` - 정보 메시지, 툴팁
- `blue-600`: `#2563eb` - 호버 상태

### Neutral Colors (회색 스케일)

#### Light Mode (기본)
- `white`: `#ffffff` - 배경
- `gray-50`: `#f9fafb` - 섹션 구분 배경
- `gray-100`: `#f3f4f6` - 카드 배경
- `gray-200`: `#e5e7eb` - 테두리
- `gray-300`: `#d1d5db` - 비활성 요소
- `gray-400`: `#9ca3af` - 플레이스홀더
- `gray-500`: `#6b7280` - 보조 텍스트
- `gray-600`: `#4b5563` - 본문 텍스트
- `gray-700`: `#374151` - 제목
- `gray-900`: `#111827` - 강조 텍스트

#### Dark Mode
- `gray-950`: `#0a0a0a` - 배경
- `gray-900`: `#111827` - 카드 배경
- `gray-800`: `#1f2937` - 섹션 구분
- `gray-700`: `#374151` - 테두리
- `gray-500`: `#6b7280` - 보조 텍스트
- `gray-400`: `#9ca3af` - 본문 텍스트
- `gray-100`: `#f3f4f6` - 제목

---

## 타이포그래피 (Typography)

### 폰트 패밀리
```css
--font-display: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-body: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

### 텍스트 스타일

#### 헤드라인
- **H1 (Page Title)**: `text-3xl md:text-4xl font-bold` (30px/36px → 모바일/데스크탑)
- **H2 (Section Title)**: `text-2xl md:text-3xl font-bold` (24px/30px)
- **H3 (Card Title)**: `text-xl md:text-2xl font-semibold` (20px/24px)
- **H4 (Sub Title)**: `text-lg md:text-xl font-semibold` (18px/20px)

#### 본문
- **Body Large**: `text-base md:text-lg` (16px/18px)
- **Body Regular**: `text-sm md:text-base` (14px/16px)
- **Body Small**: `text-xs md:text-sm` (12px/14px)
- **Caption**: `text-xs` (12px)

#### 버튼 텍스트
- **Large Button**: `text-base font-semibold` (16px)
- **Regular Button**: `text-sm font-medium` (14px)
- **Small Button**: `text-xs font-medium` (12px)

### Line Height
- **Tight**: `leading-tight` (1.25) - 헤드라인
- **Normal**: `leading-normal` (1.5) - 본문
- **Relaxed**: `leading-relaxed` (1.625) - 긴 텍스트

---

## 간격 시스템 (Spacing)

TailwindCSS 기본 간격 체계 사용 (4px 단위)

### 컴포넌트 간격
- **XXS**: `space-1` (4px) - 아이콘 간격
- **XS**: `space-2` (8px) - 밀접한 요소
- **S**: `space-3` (12px) - 관련 요소
- **M**: `space-4` (16px) - 기본 간격
- **L**: `space-6` (24px) - 섹션 내부
- **XL**: `space-8` (32px) - 섹션 간격
- **XXL**: `space-12` (48px) - 페이지 섹션

### 패딩/마진
- **Container**: `px-4 md:px-6` (16px/24px 좌우)
- **Card**: `p-4 md:p-6` (16px/24px)
- **Button**: `px-4 py-2` (좌우 16px, 상하 8px)

---

## 컴포넌트 스타일

### 버튼 (Buttons)

#### Primary Button
```css
bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
text-white font-semibold
rounded-xl px-6 py-3
shadow-sm hover:shadow-md
transition-all duration-200
```

#### Secondary Button
```css
bg-white hover:bg-gray-50
text-indigo-600 border-2 border-indigo-500
rounded-xl px-6 py-3
transition-all duration-200
```

#### Rose Accent Button (호스트 전용)
```css
bg-rose-500 hover:bg-rose-600
text-white font-semibold
rounded-xl px-6 py-3
shadow-sm hover:shadow-md
```

#### Ghost Button
```css
bg-transparent hover:bg-gray-100
text-gray-700
rounded-xl px-4 py-2
```

### 카드 (Cards)

#### Default Card
```css
bg-white rounded-2xl
p-4 md:p-6
shadow-sm hover:shadow-md
border border-gray-100
transition-all duration-200
```

#### Host Profile Card
```css
bg-white rounded-2xl
overflow-hidden
shadow-md hover:shadow-lg
border border-gray-100
transition-all duration-300
```

#### Elevated Card
```css
bg-white rounded-2xl
p-6
shadow-lg
```

### 입력 필드 (Input Fields)

#### Text Input
```css
bg-white border-2 border-gray-200
focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
rounded-xl px-4 py-3
text-gray-900 placeholder:text-gray-400
transition-all duration-200
```

#### Search Input
```css
bg-gray-50 border-2 border-transparent
focus:bg-white focus:border-indigo-500
rounded-full px-6 py-3
```

### 배지 (Badges)

#### Status Badge
```css
/* Online */
bg-emerald-100 text-emerald-700
px-3 py-1 rounded-full text-xs font-medium

/* Offline */
bg-gray-100 text-gray-600
px-3 py-1 rounded-full text-xs font-medium

/* Busy */
bg-rose-100 text-rose-700
px-3 py-1 rounded-full text-xs font-medium
```

#### Tag Badge
```css
bg-indigo-50 text-indigo-600
px-3 py-1 rounded-lg text-xs font-medium
border border-indigo-100
```

---

## 아이콘 시스템

### 아이콘 라이브러리
- **Primary**: Lucide React (일관된 스타일, 경량)
- **Size**: 16px (sm), 20px (base), 24px (lg), 32px (xl)

### 주요 아이콘
- **통화**: Phone, PhoneCall, PhoneIncoming, PhoneOutgoing
- **메시지**: MessageCircle, MessageSquare
- **사용자**: User, Users, UserPlus, UserCheck
- **하트**: Heart, HeartFilled
- **별점**: Star, StarFilled
- **시간**: Clock, Calendar, AlarmClock
- **포인트**: Coins, CreditCard, Wallet
- **설정**: Settings, ChevronRight, ChevronDown, Menu, X
- **상태**: CheckCircle, AlertCircle, XCircle, Info

---

## 그림자 (Shadows)

```css
/* Small */
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)

/* Medium (기본) */
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)

/* Large */
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)

/* Extra Large (모달) */
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

---

## 둥근 모서리 (Border Radius)

```css
rounded-lg: 8px    /* 작은 요소 */
rounded-xl: 12px   /* 버튼, 입력 필드 */
rounded-2xl: 16px  /* 카드 */
rounded-3xl: 24px  /* 큰 카드 */
rounded-full: 9999px /* 원형 버튼, 배지 */
```

---

## 애니메이션 & 트랜지션

### 기본 트랜지션
```css
transition-all duration-200 ease-in-out
```

### 호버 효과
- **스케일**: `hover:scale-105 active:scale-95`
- **투명도**: `hover:opacity-80`
- **그림자**: `hover:shadow-md`

### 페이드 인
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 스켈레톤 로딩
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
animate-pulse
```

---

## 레이아웃 패턴

### 컨테이너
```css
max-w-7xl mx-auto px-4 md:px-6 lg:px-8
```

### 그리드 시스템
```css
/* 호스트 카드 그리드 */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6

/* 2열 그리드 */
grid grid-cols-2 gap-3
```

### 플렉스 레이아웃
```css
/* 중앙 정렬 */
flex items-center justify-center

/* 공간 분배 */
flex items-center justify-between

/* 세로 배치 */
flex flex-col gap-4
```

---

## 반응형 디자인

### Breakpoints (TailwindCSS 기본)
- **sm**: 640px (모바일 가로)
- **md**: 768px (태블릿)
- **lg**: 1024px (데스크탑)
- **xl**: 1280px (큰 데스크탑)
- **2xl**: 1536px (매우 큰 화면)

### Mobile First 원칙
기본 스타일은 모바일 기준, 큰 화면은 md:, lg: 접두사 사용

```css
/* 모바일: 1열, 태블릿: 2열, 데스크탑: 3열 */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## 접근성 (Accessibility)

### 색상 대비
- **본문 텍스트**: 최소 4.5:1 대비율 (WCAG AA)
- **큰 텍스트 (18px+)**: 최소 3:1 대비율

### 포커스 표시
```css
focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
focus:outline-none
```

### 터치 타겟 크기
- **최소**: 44x44px (Apple), 48x48px (Android)
- **권장**: 56x56px (편안한 터치)

---

## 사용 예시

### 호스트 프로필 카드
```tsx
<div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
  <img src="..." className="w-full h-64 object-cover" />
  <div className="p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xl font-semibold text-gray-900">홍길동</h3>
      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
        온라인
      </span>
    </div>
    <p className="text-sm text-gray-600 mb-4">안녕하세요! 즐거운 대화 나눠요 😊</p>
    <div className="flex items-center gap-2 mb-4">
      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs">영화</span>
      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs">여행</span>
    </div>
    <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl py-3 transition-all duration-200">
      통화 요청
    </button>
  </div>
</div>
```

---

## 다크 모드 가이드 (향후 적용)

### 색상 반전
- **배경**: white → gray-950
- **카드**: white → gray-900
- **텍스트**: gray-900 → gray-100
- **테두리**: gray-200 → gray-700

### 다크 모드 클래스
```css
dark:bg-gray-950 dark:text-gray-100
dark:border-gray-700
```

---

**디자인 레퍼런스**:
- Tinder (매칭 플랫폼 UI)
- Bumble (따뜻한 색감, 친근한 UX)
- Discord (음성 커뮤니케이션)
- Airbnb (프로필 중심 레이아웃)
