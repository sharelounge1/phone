# CLAUDE.md - FreeTalk 프로젝트 개발 규칙 및 산출물 생성 가이드

---

# Part 1: 프로젝트 규칙

## 프로젝트 개요
- **프로젝트명**: FreeTalk (자유통화)
- **목적**: 나와 잘 맞는 상대와, 서로 원하는 시간에, 자유로운 주제로 통화하는 1:1 음성 대화 플랫폼
- **기술스택**: React, TypeScript, Vite, TailwindCSS, Supabase, WebRTC, Render.com
- **포트**: 5173 (개발 서버)
- **배포**: 모바일 웹(반응형) → 하이브리드 앱 패키징

## 핵심 개발 철학

### 1. 포인트 정확성 최우선 원칙
- **서버 검증**: 모든 포인트 계산과 차감은 백엔드에서만 수행 (FE는 표시만)
- **실시간 동기화**: 포인트 잔액, 통화 시간은 실시간으로 서버와 동기화
- **투명성**: 사용자에게 포인트 차감 내역을 명확히 표시 (요청 비용 200P, 분당 요금 등)

### 2. 실시간 통신 안정성
- **WebRTC 안정성**: 통화 연결 실패 시 자동 재시도 및 명확한 에러 메시지
- **타임아웃 처리**: 통화 요청 30초, 예약 응답 24시간 등 명확한 타임아웃 정책
- **상태 관리**: 온라인/오프라인, 통화 중 상태를 실시간 반영

### 3. 유저 안전 및 신뢰도
- **신고/차단 시스템**: 모든 화면에서 신고/차단 기능 접근 가능
- **관리자 승인**: 통화 받는 사람(호스트)은 프로필 검수 후 승인
- **후기/평점**: 모든 통화 후 별점 및 후기 작성 권장

### 4. FE/BE 책임 범위
```
✅ FE 담당:
- UI/UX 렌더링 및 사용자 인터랙션
- 포인트 잔액 표시 (서버에서 받은 값만 표시)
- WebRTC 피어 연결 관리 (시그널링은 BE)
- 프로필 이미지 업로드 (Supabase Storage 직접 연동)
- 클라이언트 사이드 유효성 검사 (추가 서버 검증 필수)
- 로컬 상태 관리 (Zustand)

❌ BE 담당 (FE에서 구현 금지):
- 포인트 계산 및 차감 로직
- 통화 요금 계산 (분당 요금 × 통화 시간)
- 통화 세션 생성/종료 처리
- 호스트 승인/반려 처리
- 신고 처리 및 계정 정지
- 결제 처리 (PG 연동)
- 통화 시간 검증 및 자동 종료
```

## 기술 스택 & 구조

### 필수 기술 스택
```
Runtime: React 18 + TypeScript + Vite 5
State: Zustand (전역 상태 관리)
Style: TailwindCSS + Radix UI
Router: React Router v6
Backend: Supabase (Database, Auth, Storage, Realtime)
Deploy: Render.com (Web App) + Vercel (Frontend, 선택)
Communication: WebRTC (simple-peer 또는 PeerJS)
Payment: 토스페이먼츠 또는 PortOne (구현 시 결정)
```

### 프로젝트 구조
```
src/
├── components/
│   ├── ui/              # Radix UI 기반 재사용 컴포넌트
│   ├── common/          # 공통 컴포넌트 (Header, Footer, Card 등)
│   ├── screens/         # 페이지별 주요 컴포넌트
│   │   ├── auth/        # 로그인, 회원가입, 온보딩
│   │   ├── home/        # 메인 홈, 호스트 리스트
│   │   ├── profile/     # 프로필 상세, 편집
│   │   ├── call/        # 통화 화면, 통화 요청
│   │   ├── reservation/ # 예약 관리
│   │   ├── history/     # 통화 히스토리
│   │   ├── point/       # 포인트 충전, 사용 내역
│   │   └── admin/       # 관리자 화면
│   └── layout/          # 레이아웃 컴포넌트
├── stores/              # Zustand 스토어
│   ├── authStore.ts     # 인증 상태
│   ├── userStore.ts     # 사용자 프로필, 포인트
│   ├── callStore.ts     # 통화 상태 (연결 중, 통화 중 등)
│   └── notificationStore.ts # 알림 상태
├── hooks/
│   ├── useAuth.ts       # 인증 관련 훅
│   ├── usePoints.ts     # 포인트 조회/충전 훅
│   ├── useCall.ts       # 통화 요청/관리 훅
│   ├── useWebRTC.ts     # WebRTC 연결 훅
│   └── useSupabase.ts   # Supabase Realtime 구독 훅
├── services/
│   ├── supabase.ts      # Supabase 클라이언트 초기화
│   ├── authService.ts   # 인증 API
│   ├── profileService.ts # 프로필 CRUD
│   ├── callService.ts   # 통화 요청/세션 API
│   ├── pointService.ts  # 포인트/결제 API
│   ├── reviewService.ts # 후기/평점 API
│   └── webrtcService.ts # WebRTC 시그널링
├── types/
│   ├── user.ts          # User, Profile 타입
│   ├── call.ts          # CallRequest, CallSession 타입
│   ├── point.ts         # PointTransaction, Payment 타입
│   └── api.ts           # API 공통 타입
├── utils/
│   ├── pointCalculator.ts # 포인트 계산 유틸 (표시용, 실제 계산은 BE)
│   ├── timeFormatter.ts   # 시간 포맷팅
│   └── validation.ts      # 유효성 검사
├── mocks/
│   └── handlers.ts      # MSW 핸들러 (개발/테스트용)
└── assets/
    ├── icons/
    └── images/
```

## 코딩 컨벤션

### 1. 명명 규칙
```typescript
// 컴포넌트: PascalCase
const LoginScreen = () => { };
const HostProfileCard = () => { };

// 변수/함수: camelCase
const userName = 'john';
const handleCallRequest = () => { };

// 이벤트 핸들러: on[Action] 형태
const onLogin = () => { };
const onCallAccept = () => { };
const onPointCharge = () => { };

// 상수: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.freetalk.com';
const MAX_CALL_DURATION = 180; // 분
const CALL_REQUEST_COST = 200; // 포인트

// 파일명:
// - 컴포넌트: PascalCase.tsx (LoginScreen.tsx)
// - 훅: camelCase.ts (useAuth.ts)
// - 서비스: camelCase.ts (callService.ts)
```

### 2. 컴포넌트 작성 규칙
```typescript
// ✅ 반드시 이 구조 준수
import { useState, useEffect, useMemo, useCallback } from 'react';

interface ComponentProps {
  // Props 타입 명시적 정의 (필수)
  userId: string;
  onSuccess?: () => void;
}

export const ComponentName = ({ userId, onSuccess }: ComponentProps) => {
  // 1. State 변수들
  const [loading, setLoading] = useState(false);

  // 2. 커스텀 훅들
  const { user } = useAuth();
  const { balance } = usePoints();

  // 3. 계산된 값들 (useMemo)
  const canMakeCall = useMemo(() => balance >= CALL_REQUEST_COST, [balance]);

  // 4. 이벤트 핸들러들 (useCallback)
  const handleCallRequest = useCallback(async () => {
    setLoading(true);
    try {
      // 로직...
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  // 5. 사이드 이펙트들 (useEffect)
  useEffect(() => {
    // 구독 로직...
  }, []);

  // 6. 렌더링
  return <div>{/* JSX */}</div>;
};
```

### 3. 스타일링 규칙
```typescript
// ✅ TailwindCSS + Radix UI 사용
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// ✅ FreeTalk 전용 색상 정의 (tailwind.config.js)
const colors = {
  'primary': '#6366f1',      // 인디고 (통화 요청, 주요 액션)
  'success': '#10b981',      // 그린 (통화 수락, 포인트 충전)
  'warning': '#f59e0b',      // 앰버 (포인트 부족 경고)
  'error': '#ef4444',        // 레드 (거절, 에러)
  'host': '#8b5cf6',         // 바이올렛 (호스트 전용 기능)
  'caller': '#3b82f6',       // 블루 (콜러 전용 기능)
};

// ✅ 모바일 우선 반응형
<div className="w-full px-4 md:px-6 lg:max-w-4xl">
  {/* 모바일 기본, 태블릿/데스크탑 대응 */}
</div>
```

## 프로젝트별 특화 규칙

### 1. 포인트 시스템 규칙
```typescript
// ✅ 포인트 조회는 항상 서버에서
import { usePoints } from '@/hooks/usePoints';

const Component = () => {
  const { balance, refresh } = usePoints(); // 서버에서 실시간 조회

  // ❌ 금지: 클라이언트에서 포인트 직접 계산
  // const newBalance = balance - 200; // 절대 금지!

  // ✅ 서버 API 호출 후 자동 새로고침
  await callService.requestCall(hostId);
  await refresh(); // 서버에서 최신 잔액 다시 가져오기
};

// ✅ 포인트 계산 표시용 유틸 (실제 차감은 서버)
export const calculateMaxCallTime = (balance: number, pricePerMin: number) => {
  if (pricePerMin === 0) return Infinity;
  return Math.floor(balance / pricePerMin); // 분 단위
};

// ✅ 포인트 부족 체크
export const canAffordCall = (balance: number, requestCost: number, hostPrice: number, minMinutes: number = 1) => {
  const totalNeeded = requestCost + (hostPrice * minMinutes);
  return balance >= totalNeeded;
};
```

### 2. 통화 세션 관리 규칙
```typescript
// ✅ 통화 상태 관리 (Zustand)
interface CallState {
  status: 'idle' | 'requesting' | 'connecting' | 'active' | 'ending';
  sessionId: string | null;
  peerId: string | null;
  startTime: Date | null;
  elapsedSeconds: number;
}

// ✅ WebRTC 연결 훅
const useWebRTC = (sessionId: string) => {
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);

  useEffect(() => {
    // WebRTC 연결 초기화
    const p = new SimplePeer({
      initiator: isInitiator,
      trickle: false,
    });

    p.on('signal', (signal) => {
      // Supabase Realtime으로 시그널 전송
      supabase.channel(`call:${sessionId}`).send({
        type: 'broadcast',
        event: 'signal',
        payload: { signal },
      });
    });

    p.on('stream', (stream) => {
      // 오디오 스트림 연결
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play();
    });

    return () => p.destroy();
  }, [sessionId]);

  return { peer };
};

// ❌ 금지: 통화 시간 조작
// 통화 시간은 서버에서 추적하며, FE는 표시만 함
```

### 3. 실시간 알림 규칙
```typescript
// ✅ Supabase Realtime 구독
const useCallNotifications = (userId: string) => {
  useEffect(() => {
    const channel = supabase
      .channel('call-requests')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'call_requests',
        filter: `host_id=eq.${userId}`,
      }, (payload) => {
        // 새 통화 요청 알림
        showNotification({
          title: '새 통화 요청',
          message: `${payload.new.caller_name}님이 통화를 요청했습니다.`,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
};
```

## API 통신 규칙

```typescript
// ✅ Supabase 클라이언트 사용
import { supabase } from '@/services/supabase';

// ✅ 타입 우선 정의
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface CallRequest {
  id: string;
  caller_id: string;
  host_id: string;
  type: 'now' | 'reservation';
  requested_time_start?: string;
  requested_time_end?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  created_at: string;
}

// ✅ 서비스별 API 모듈
export const callService = {
  // 통화 요청 생성 (200P 차감은 서버에서)
  requestCall: async (hostId: string, type: 'now' | 'reservation', timeRange?: { start: string; end: string }) => {
    const { data, error } = await supabase
      .from('call_requests')
      .insert({
        host_id: hostId,
        type,
        requested_time_start: timeRange?.start,
        requested_time_end: timeRange?.end,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 통화 요청 수락/거절
  respondToRequest: async (requestId: string, action: 'accept' | 'reject', reservedTime?: { start: string; end: string }) => {
    const { data, error } = await supabase.rpc('respond_to_call_request', {
      request_id: requestId,
      action,
      reserved_start: reservedTime?.start,
      reserved_end: reservedTime?.end,
    });

    if (error) throw error;
    return data;
  },

  // 통화 세션 종료 (포인트 차감은 서버에서 자동)
  endCall: async (sessionId: string) => {
    const { data, error } = await supabase.rpc('end_call_session', {
      session_id: sessionId,
    });

    if (error) throw error;
    return data;
  },
};

// ✅ 에러 처리
export const handleSupabaseError = (error: any) => {
  if (error.code === 'PGRST116') {
    return '데이터를 찾을 수 없습니다.';
  } else if (error.message.includes('insufficient_points')) {
    return '포인트가 부족합니다.';
  }
  return error.message || '오류가 발생했습니다.';
};
```

## 테스트 & 품질 관리

```typescript
// ✅ 컴포넌트 테스트
import { render, screen } from '@testing-library/react';
import { CallRequestButton } from './CallRequestButton';

describe('CallRequestButton', () => {
  it('포인트 부족 시 버튼 비활성화', () => {
    render(<CallRequestButton balance={100} requestCost={200} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('충분한 포인트 보유 시 버튼 활성화', () => {
    render(<CallRequestButton balance={500} requestCost={200} />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });
});

// ✅ API 모킹 (MSW)
import { rest } from 'msw';

export const handlers = [
  rest.post('/rest/v1/call_requests', (req, res, ctx) => {
    return res(ctx.json({
      id: 'req-123',
      status: 'pending',
      created_at: new Date().toISOString(),
    }));
  }),
];
```

## 개발 명령어

```bash
npm run dev          # 개발 서버 (http://localhost:5173)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 미리보기
npm run test         # 테스트 (Vitest)
npm run lint         # ESLint
npm run type-check   # TypeScript 타입 체크
```

## 주의사항

### ❌ 금지 사항
- **console.log 운영 코드 포함 금지** (개발 중에만 사용, 배포 전 제거)
- **any 타입 사용 금지** (모든 타입은 명시적으로 정의)
- **클라이언트에서 포인트 계산/차감 금지** (서버에서만 수행)
- **통화 시간 조작 금지** (서버에서 추적)
- **민감정보 로컬 저장 금지** (토큰은 httpOnly 쿠키 또는 secure storage)
- **하드코딩된 API 키 금지** (환경 변수 사용: .env)

### ✅ 준수 사항
- **모든 포인트 관련 로직은 서버 검증 필수**
- **통화 요청/세션은 Supabase RPC 함수 사용**
- **실시간 데이터는 Supabase Realtime 구독**
- **이미지는 Supabase Storage 사용 (CDN)**
- **모바일 우선 반응형 디자인**
- **접근성(a11y) 고려: aria-label, 키보드 네비게이션**
- **통화 전 포인트 잔액 체크 및 안내**
- **모든 에러는 사용자 친화적 메시지로 변환**

---

# Part 2: 산출물 생성 가이드 (모든 프로젝트 공통)

## 문서 관리 규칙

### 화면 변경 시 문서 업데이트 (필수)
**화면이 업데이트, 추가, 삭제될 때마다 반드시 관련 .md 문서들을 함께 업데이트해야 합니다.**

```
화면 변경 시 업데이트 대상 문서:
├── docs/INFORMATION_ARCHITECTURE.md    # IA 구조, 사이트맵
├── docs/SCREEN_SPECIFICATIONS.md       # 화면별 기능 명세
├── docs/API_SPECIFICATION.md           # 연관 API 엔드포인트
├── docs/DESIGN_SYSTEM.md              # 새로운 UI 패턴 (필요시)
└── README.md                          # 전체 기능 목록
```

### 문서 동기화 체크리스트
- [ ] IA 문서의 사이트맵이 실제 라우팅과 일치하는가?
- [ ] 화면 명세가 실제 구현된 기능과 일치하는가?
- [ ] API 명세가 실제 사용되는 엔드포인트와 일치하는가?
- [ ] README의 기능 목록이 최신 상태인가?

## 프로젝트 산출물 생성 가이드

**새 프로젝트에서 동일한 산출물 구조를 만들기 위한 가이드입니다.**

### 1. README.md 작성 규칙

README.md는 프로젝트의 첫인상이자 전체 개요를 제공합니다.

```markdown
# FreeTalk (자유통화)

## 프로젝트 개요
- **목적**: 나와 잘 맞는 상대와, 서로 원하는 시간에, 자유로운 주제로 통화하는 1:1 음성 대화 플랫폼
- **사용자**: 통화 받는 사람(호스트), 통화 거는 사람(게스트)
- **환경**: 모바일 웹 반응형 → 하이브리드 앱

## 기술 스택
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)](https://supabase.com/)

## 주요 기능
### 인증 & 프로필
- **SNS 간편 로그인**: 카카오, 구글, 애플
- **프로필 관리**: 닉네임, 사진, 자기소개, 관심사, 언어
- **호스트 승인**: 관리자 프로필 검수 및 승인

### 통화 시스템
- **실시간 통화 요청**: 지금 바로 통화 요청
- **예약 통화**: 특정 시간대 예약 요청 및 수락
- **WebRTC 음성 통화**: 1:1 실시간 음성 대화
- **통화 타이머**: 경과 시간 및 남은 예상 시간 표시

### 포인트 & 결제
- **포인트 충전**: 10,000원(10,000P), 30,000원(40,000P), 100,000원(150,000P)
- **통화 요청 비용**: 1회당 200P
- **분당 요금**: 호스트별 설정 (100P~1,000P)
- **자동 차감**: 통화 시간 기반 포인트 자동 차감

### 후기 & 평점
- **별점 시스템**: 1~5점 평가
- **텍스트 후기**: 통화 후 상대 평가
- **신뢰도 지표**: 평균 평점, 통화 횟수 기반 인기도

### 관리 기능
- **신고/차단**: 부적절한 사용자 신고 및 차단
- **관리자 대시보드**: 유저 관리, 호스트 승인, 신고 처리
- **통계**: 일/주/월 단위 통화/결제/가입 통계

## 프로젝트 구조
```
src/
├── components/
│   ├── ui/              # Radix UI 기반 재사용 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   ├── screens/         # 페이지별 컴포넌트
│   └── layout/          # 레이아웃
├── stores/              # Zustand 스토어
├── hooks/               # 커스텀 훅
├── services/            # API 서비스
├── types/               # TypeScript 타입
└── utils/               # 유틸리티 함수
```

## 개발 가이드
### 시작하기
```bash
npm install
npm run dev
```

### 주요 명령어
- `npm run dev`: 개발 서버 (http://localhost:5173)
- `npm run build`: 프로덕션 빌드
- `npm run test`: 테스트 실행
- `npm run lint`: 린트 체크

## 문서
- [정보구조도](./docs/INFORMATION_ARCHITECTURE.md)
- [화면명세서](./docs/SCREEN_SPECIFICATIONS.md)
- [API명세서](./docs/API_SPECIFICATION.md)
- [디자인시스템](./docs/DESIGN_SYSTEM.md)

## 프로젝트 진행률
![Progress](https://img.shields.io/badge/진행률-0%25-red)
- 완료된 모듈: 0/15
- 현재 진행 중: Phase 0 - 기획 및 설계
```

### 2. 정보구조도 (INFORMATION_ARCHITECTURE.md) 작성 규칙

**목적**: 전체 사이트맵과 화면 간 네비게이션 구조를 명확히 정의

```markdown
# FreeTalk 정보구조도

## 개요
시스템의 전체 화면 구조와 네비게이션 경로를 정의합니다.

## 홈 화면 메뉴 구조 (4개 메뉴)
```
홈 화면 (HomeScreen)
├── 탐색 (/home)
├── 통화예약 (/reservations)
├── 히스토리 (/history)
└── 마이페이지 (/mypage)
```

## 전체 사이트맵 (Implemented Features Only)
```
FreeTalk
├── 인증 (Authentication)
│   ├── 스플래시 (/) - SplashScreen
│   ├── 로그인 (/login) - LoginScreen
│   ├── 회원가입 (/signup) - SignupScreen
│   └── 온보딩 (/onboarding) - OnboardingScreen
│
├── 메인 홈 (Home Dashboard)
│   └── 탐색 (/home) - HomeScreen
│       ├── 추천 호스트 리스트
│       ├── 카테고리 탭 (인기/신규/언어별/관심사별)
│       └── 검색 & 필터 (/home/search) - SearchScreen
│
├── 프로필 (Profile) - /profile
│   ├── 호스트 상세 (/:hostId) - HostProfileScreen
│   └── 내 프로필 편집 (/edit) - ProfileEditScreen
│
├── 통화 (Call) - /call
│   ├── 통화 요청 (/:hostId/request) - CallRequestScreen
│   ├── 통화 연결 대기 (/:sessionId/connecting) - CallConnectingScreen
│   ├── 통화 중 (/:sessionId/active) - CallActiveScreen
│   └── 통화 종료 (/:sessionId/end) - CallEndScreen
│
├── 예약 (Reservation) - /reservations
│   ├── 예약 리스트 (/) - ReservationListScreen
│   ├── 예약 상세 (/:reservationId) - ReservationDetailScreen
│   └── 예약 요청 (/:hostId/new) - ReservationRequestScreen
│
├── 히스토리 (History) - /history
│   ├── 통화 히스토리 (/) - CallHistoryScreen
│   └── 좋아요 목록 (/favorites) - FavoritesScreen
│
├── 포인트 (Point) - /point
│   ├── 포인트 충전 (/charge) - PointChargeScreen
│   ├── 포인트 사용 내역 (/transactions) - PointTransactionScreen
│   └── 결제 내역 (/payments) - PaymentHistoryScreen
│
├── 마이페이지 (Mypage) - /mypage
│   ├── 마이페이지 홈 (/) - MypageScreen
│   ├── 호스트 신청 (/host/apply) - HostApplicationScreen
│   ├── 후기 관리 (/reviews) - ReviewManagementScreen
│   ├── 설정 (/settings) - SettingsScreen
│   ├── 고객센터 (/support) - SupportScreen
│   └── 신고 내역 (/reports) - ReportListScreen
│
└── 관리자 (Admin) - /admin
    ├── 로그인 (/admin/login) - AdminLoginScreen
    ├── 대시보드 (/admin/dashboard) - AdminDashboardScreen
    ├── 유저 관리 (/admin/users) - AdminUserManagementScreen
    ├── 호스트 승인 (/admin/host-approval) - AdminHostApprovalScreen
    ├── 신고 관리 (/admin/reports) - AdminReportManagementScreen
    └── 통계 (/admin/statistics) - AdminStatisticsScreen
```

## 화면 설명

### 인증 및 홈
- **SplashScreen**: 앱 시작 화면, 서비스 소개
- **LoginScreen**: 이메일/SNS 로그인
- **SignupScreen**: 회원가입 및 약관 동의
- **OnboardingScreen**: 서비스 사용법 튜토리얼
- **HomeScreen**: 메인 런처, 호스트 탐색

### 프로필
- **HostProfileScreen**: 호스트 상세 정보, 후기, 통화 요청 버튼
- **ProfileEditScreen**: 내 프로필 편집 (닉네임, 사진, 관심사 등)

### 통화
- **CallRequestScreen**: 지금 통화 / 예약 통화 선택
- **CallConnectingScreen**: WebRTC 연결 대기
- **CallActiveScreen**: 통화 중 화면 (타이머, 음소거 등)
- **CallEndScreen**: 통화 종료 후 후기 작성

### 예약
- **ReservationListScreen**: 다가오는 예약 / 지난 예약
- **ReservationDetailScreen**: 예약 상세 정보 및 취소
- **ReservationRequestScreen**: 예약 시간대 선택

### 히스토리 & 포인트
- **CallHistoryScreen**: 내가 통화한 사람 리스트
- **FavoritesScreen**: 좋아요한 호스트 목록
- **PointChargeScreen**: 포인트 충전 패키지 선택
- **PointTransactionScreen**: 포인트 사용 내역
- **PaymentHistoryScreen**: 결제 내역

### 마이페이지
- **MypageScreen**: 프로필, 포인트, 평점 요약
- **HostApplicationScreen**: 호스트 신청 및 승인 상태
- **ReviewManagementScreen**: 내가 받은 후기 관리
- **SettingsScreen**: 알림 설정, 차단 리스트, 로그아웃
- **SupportScreen**: FAQ, 1:1 문의

### 관리자
- **AdminDashboardScreen**: 오늘 가입자, 통화 건수, 결제 금액
- **AdminUserManagementScreen**: 전체 유저 리스트 및 계정 관리
- **AdminHostApprovalScreen**: 호스트 신청 승인/반려
- **AdminReportManagementScreen**: 신고 접수 처리
- **AdminStatisticsScreen**: 일/주/월 통계 및 CSV 다운로드

---
*참고: 실제 구현 시 라우팅 경로는 변경될 수 있음*
```

**작성 규칙**:
- 반드시 실제 구현된 화면만 포함 (플레이스홀더 제외)
- 라우트 경로와 컴포넌트명을 정확히 매칭
- AppRouter.tsx의 실제 라우팅 구조와 100% 일치해야 함
- 화면명은 [기능명]Screen 형태로 통일

### 3. 화면명세서 (SCREEN_SPECIFICATIONS.md) 생성 규칙

**목적**: 각 화면의 UI, 기능, 프로세스를 스크린샷과 함께 문서화

#### 3.1. 스크린샷 캡처 자동화

**scripts/capture-[기능명].mjs 패턴**:
```javascript
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // iPhone SE 사이즈
  });
  const page = await context.newPage();

  // 개발 서버 접속
  await page.goto('http://localhost:5173/login');
  await page.waitForLoadState('networkidle');

  // 1. 로그인 화면 캡처
  await page.screenshot({
    path: 'docs/screenshots/auth-login.png',
    fullPage: false
  });

  // 2. 회원가입 화면으로 이동
  await page.click('a[href="/signup"]');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'docs/screenshots/auth-signup.png',
    fullPage: false
  });

  await browser.close();
  console.log('✅ 인증 화면 스크린샷 캡처 완료');
})();
```

**스크린샷 명명 규칙**:
- 기본 화면: `[카테고리]-[화면명].png` (예: auth-login.png, call-active.png)
- 스크롤 화면: `[카테고리]-[화면명]-scrolled.png`
- 모달/팝업: `[카테고리]-[요소명]-modal.png`
- 저장 위치: `docs/screenshots/`

**스크린샷 캡처 시기**:
- 세로로 긴 화면: 상단/하단 2장 캡처 (dual screenshot)
- 모달/드롭다운: 열린 상태 캡처
- 탭 전환: 각 탭별 캡처
- 상태 변화: 변화 전/후 캡처

#### 3.2. 화면명세서 자동 생성 스크립트

**scripts/generate-complete-spec.cjs 패턴**:
```javascript
const fs = require('fs');
const path = require('path');

const screens = [
  {
    id: 'FT-AUTH-001',
    category: '인증',
    name: '로그인',
    route: '/login',
    component: 'LoginScreen',
    screenshot: 'auth-login.png',
    features: [
      '이메일 + 비밀번호 로그인',
      'SNS 간편 로그인 (카카오, 구글, 애플)',
      '비밀번호 찾기',
    ],
    process: [
      { step: 1, action: '이메일 입력', result: '유효성 검사 (이메일 형식)' },
      { step: 2, action: '비밀번호 입력', result: '최소 8자 이상 검사' },
      { step: 3, action: '로그인 버튼 클릭', result: 'Supabase Auth 인증 → 홈 화면 이동' },
    ]
  },
  {
    id: 'FT-CALL-001',
    category: '통화',
    name: '통화 중',
    route: '/call/:sessionId/active',
    component: 'CallActiveScreen',
    screenshot: 'call-active.png',
    features: [
      '실시간 통화 타이머 (경과 시간)',
      '남은 예상 통화 시간 (포인트 기준)',
      '음소거/스피커 전환',
      '통화 종료 버튼',
    ],
    process: [
      { step: 1, action: 'WebRTC 연결 완료', result: '통화 시작, 타이머 시작' },
      { step: 2, action: '1초마다 타이머 업데이트', result: '경과 시간 표시 (00:00 형식)' },
      { step: 3, action: '포인트 부족 1분 전', result: '팝업 경고: "1분 후 자동 종료됩니다"' },
      { step: 4, action: '통화 종료 버튼 클릭', result: '서버에 종료 요청 → 포인트 차감 → 후기 화면 이동' },
    ]
  },
  // ... 모든 화면 정의
];

function generateMarkdown() {
  let markdown = `# 화면 명세서\n\n`;
  markdown += `**문서 버전**: 1.0\n`;
  markdown += `**최종 수정일**: ${new Date().toISOString().split('T')[0]}\n\n`;

  // 카테고리별 그룹화
  const categories = {};
  screens.forEach(screen => {
    if (!categories[screen.category]) {
      categories[screen.category] = [];
    }
    categories[screen.category].push(screen);
  });

  // 각 카테고리별 테이블 생성
  Object.keys(categories).forEach(category => {
    markdown += `## ${category}\n\n`;
    markdown += `<table>\n`;
    markdown += `<tr>\n`;
    markdown += `  <th style="width: 10%;">화면 ID</th>\n`;
    markdown += `  <th style="width: 15%;">화면명</th>\n`;
    markdown += `  <th style="width: 50%;">화면 이미지</th>\n`;
    markdown += `  <th style="width: 25%;">주요 기능</th>\n`;
    markdown += `</tr>\n`;

    categories[category].forEach(screen => {
      markdown += `<tr>\n`;
      markdown += `  <td>${screen.id}</td>\n`;
      markdown += `  <td><strong>${screen.name}</strong><br/><code>${screen.route}</code></td>\n`;
      markdown += `  <td><img src="./screenshots/${screen.screenshot}" alt="${screen.name}" style="max-width: 100%; height: auto;" /></td>\n`;
      markdown += `  <td>\n`;
      markdown += `    <strong>주요 기능:</strong>\n`;
      markdown += `    <ul>\n`;
      screen.features.forEach(feature => {
        markdown += `      <li>${feature}</li>\n`;
      });
      markdown += `    </ul>\n`;
      markdown += `    <strong>프로세스:</strong>\n`;
      markdown += `    <ol>\n`;
      screen.process.forEach(p => {
        markdown += `      <li>${p.action} → ${p.result}</li>\n`;
      });
      markdown += `    </ol>\n`;
      markdown += `  </td>\n`;
      markdown += `</tr>\n`;
    });

    markdown += `</table>\n\n`;
  });

  return markdown;
}

// 파일 생성
const markdown = generateMarkdown();
fs.writeFileSync(
  path.join(__dirname, '../docs/SCREEN_SPECIFICATIONS.md'),
  markdown,
  'utf8'
);
console.log('✅ SCREEN_SPECIFICATIONS.md 생성 완료');
```

**실행 방법**:
```bash
# 1. 스크린샷 캡처
node scripts/capture-auth.mjs
node scripts/capture-call.mjs
# ... 모든 화면 캡처

# 2. 명세서 생성
node scripts/generate-complete-spec.cjs
```

### 4. API 명세서 (API_SPECIFICATION.md) 작성 규칙

**목적**: 프론트엔드에서 호출하는 모든 API 엔드포인트 문서화

```markdown
# API 명세서

**Base URL**: Supabase Project URL (환경 변수)
**인증**: Supabase Auth JWT (자동 헤더 포함)

## 1. 인증 API

### 1.1. 이메일 로그인
- **Endpoint**: `supabase.auth.signInWithPassword()`
- **설명**: 이메일 + 비밀번호 기반 로그인
- **Request**:
```typescript
{
  email: "user@example.com",
  password: "password123"
}
```
- **Response (성공)**:
```typescript
{
  data: {
    user: {
      id: "uuid",
      email: "user@example.com",
      ...
    },
    session: {
      access_token: "jwt-token",
      refresh_token: "refresh-token",
      ...
    }
  },
  error: null
}
```
- **Response (실패)**:
```typescript
{
  data: { user: null, session: null },
  error: {
    message: "Invalid login credentials",
    status: 400
  }
}
```

### 1.2. SNS 로그인
- **Endpoint**: `supabase.auth.signInWithOAuth({ provider: 'kakao' })`
- **설명**: 카카오/구글/애플 OAuth 로그인
- **Providers**: `kakao`, `google`, `apple`

## 2. 프로필 API

### 2.1. 프로필 조회
- **Endpoint**: `GET /rest/v1/profiles?user_id=eq.{userId}`
- **Query Parameters**:
  - `user_id`: 조회할 유저 ID
- **Response**:
```typescript
{
  user_id: "uuid",
  nickname: "홍길동",
  age: 25,
  gender: "male",
  intro_text: "안녕하세요!",
  languages: ["korean", "english"],
  interests: ["영화", "여행"],
  avatar_url: "https://...",
  is_host: true,
  host_status: "approved",
  call_price_per_min: 300
}
```

### 2.2. 프로필 업데이트
- **Endpoint**: `PATCH /rest/v1/profiles?user_id=eq.{userId}`
- **Request**:
```typescript
{
  nickname: "새닉네임",
  intro_text: "새 자기소개",
  interests: ["음악", "독서"]
}
```

## 3. 통화 API

### 3.1. 통화 요청 생성
- **Endpoint**: `POST /rest/v1/rpc/create_call_request`
- **설명**: 통화 요청 생성 (200P 자동 차감)
- **Request**:
```typescript
{
  host_id: "host-uuid",
  type: "now", // 또는 "reservation"
  requested_time_start: null, // 예약인 경우 ISO 8601
  requested_time_end: null
}
```
- **Response**:
```typescript
{
  request_id: "request-uuid",
  status: "pending",
  points_deducted: 200,
  remaining_balance: 4800
}
```
- **Error**:
```typescript
{
  error: {
    code: "insufficient_points",
    message: "포인트가 부족합니다. (보유: 100P, 필요: 200P)"
  }
}
```

### 3.2. 통화 세션 종료
- **Endpoint**: `POST /rest/v1/rpc/end_call_session`
- **Request**:
```typescript
{
  session_id: "session-uuid"
}
```
- **Response**:
```typescript
{
  duration_seconds: 1234,
  used_points: 6170, // (1234초 / 60) * 300P
  remaining_balance: 3830,
  ended_at: "2025-01-08T12:34:56Z"
}
```

## 4. 포인트 API

### 4.1. 포인트 잔액 조회
- **Endpoint**: `GET /rest/v1/point_wallets?user_id=eq.{userId}`
- **Response**:
```typescript
{
  user_id: "uuid",
  balance: 10000
}
```

### 4.2. 포인트 충전 (결제 완료 후 서버 Webhook 호출)
- **Endpoint**: `POST /rest/v1/rpc/charge_points`
- **Request**:
```typescript
{
  user_id: "uuid",
  amount_krw: 30000,
  payment_gateway_id: "pg-transaction-id"
}
```
- **Response**:
```typescript
{
  points_added: 40000, // 30,000원 패키지 → 40,000P (보너스 포함)
  new_balance: 50000
}
```

## 5. 후기 API

### 5.1. 후기 작성
- **Endpoint**: `POST /rest/v1/reviews`
- **Request**:
```typescript
{
  target_user_id: "host-uuid",
  call_id: "session-uuid",
  rating: 5,
  comment: "정말 좋은 대화였어요!"
}
```

### 5.2. 내가 받은 후기 조회
- **Endpoint**: `GET /rest/v1/reviews?target_user_id=eq.{userId}`
- **Response**:
```typescript
[
  {
    id: "review-uuid",
    reviewer_id: "anonymous",
    rating: 5,
    comment: "친절하고 재미있어요!",
    created_at: "2025-01-08T12:00:00Z"
  }
]
```

## 공통 응답 형식

**성공 응답** (Supabase):
```typescript
{
  data: T, // 실제 데이터
  error: null
}
```

**실패 응답**:
```typescript
{
  data: null,
  error: {
    message: "에러 메시지",
    details: "상세 정보",
    hint: "힌트",
    code: "에러 코드"
  }
}
```

## HTTP 상태 코드
- `200 OK`: 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스 없음
- `500 Internal Server Error`: 서버 오류

## 인증 헤더
Supabase 클라이언트 사용 시 자동으로 JWT 토큰이 포함됩니다:
```
Authorization: Bearer <access_token>
apikey: <supabase_anon_key>
```
```

**작성 규칙**:
- 업무 모듈별로 섹션 분리
- 각 엔드포인트마다 Request/Response 예시 필수
- 에러 코드와 메시지 명시
- Supabase RPC 함수는 별도 표시

### 5. 산출물 생성 워크플로우

**새 프로젝트 시작 시**:
```bash
# 1. 프로젝트 생성
npm create vite@latest freetalk -- --template react-ts
cd freetalk

# 2. 문서 디렉토리 생성
mkdir -p docs/screenshots scripts

# 3. 기본 문서 파일 생성
touch docs/INFORMATION_ARCHITECTURE.md
touch docs/SCREEN_SPECIFICATIONS.md
touch docs/API_SPECIFICATION.md
touch docs/DESIGN_SYSTEM.md

# 4. 스크립트 디렉토리 생성
touch scripts/generate-complete-spec.cjs

# 5. README.md 작성 (위 템플릿 참고)
```

**화면 구현 후 문서 생성 프로세스**:
1. 화면 구현 완료
2. 스크린샷 캡처 스크립트 작성 (`scripts/capture-[기능명].mjs`)
3. 스크린샷 캡처 실행
4. `generate-complete-spec.cjs`의 screens 배열에 화면 정보 추가
5. 명세서 자동 생성 실행
6. IA 문서에 라우팅 정보 수동 업데이트
7. API 명세서에 사용된 엔드포인트 추가
8. README.md의 기능 목록 업데이트

**Git 커밋 패턴**:
```bash
git add docs/ scripts/
git commit -m "docs: [기능명] 화면 명세서 및 스크린샷 추가

- [기능명] 스크린샷 캡처 (N개)
- SCREEN_SPECIFICATIONS.md 업데이트
- INFORMATION_ARCHITECTURE.md 사이트맵 추가
- API_SPECIFICATION.md [기능명] API 추가

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 6. 자동화 팁

**package.json에 스크립트 추가**:
```json
{
  "scripts": {
    "capture:auth": "node scripts/capture-auth.mjs",
    "capture:call": "node scripts/capture-call.mjs",
    "capture:all": "npm run capture:auth && npm run capture:call",
    "docs:generate": "node scripts/generate-complete-spec.cjs",
    "docs:update": "npm run capture:all && npm run docs:generate"
  }
}
```

**실행**:
```bash
npm run docs:update  # 모든 스크린샷 재캡처 + 명세서 재생성
```

---

**이 템플릿을 활용하여 FreeTalk 프로젝트에서 일관된 품질의 문서 산출물을 생성하세요.**
