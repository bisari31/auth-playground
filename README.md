# auth-playground

인증(Auth) 및 백엔드 학습을 위한 프로젝트

## 브랜치

| 브랜치                 | 설명                                         | 상태        |
| ---------------------- | -------------------------------------------- | ----------- |
| `feat/express-session` | Express + express-session 기반 세션 인증      | 완료        |
| `feat/fastify-session` | Fastify + @fastify/session 기반 세션 인증     | 완료        |
| `main`                 | Fastify + JWT (Access/Refresh Token)          | 완료 (현재) |

## 기술 스택

### Client

- Next.js 15 (App Router)
- TanStack Query v5
- Tailwind CSS

### Server

- Fastify 5 (Express 5는 `feat/express-session` 브랜치)
- Prisma
- PostgreSQL

## feat/express-session

express-session을 사용한 세션 기반 인증 구현.

### 주요 기능

- 회원가입 / 로그인 / 로그아웃
- express-session + MemoryStore 기반 세션 관리
- 인증 미들웨어 (authMiddleware)로 보호된 라우트 처리
- Todo CRUD에 인가(403) 적용 — 본인 Todo만 수정/삭제 가능

## feat/fastify-session

Express → Fastify 마이그레이션 + 세션 인증 유지.

### 주요 기능

- Express → Fastify 전환
- @fastify/session 기반 세션 관리
- controllers/ + routes/ → 도메인별 modules/ 구조로 변경

## main (JWT)

세션 인증 → JWT Access/Refresh Token 전환.

### 주요 기능

- JWT Access Token (HttpOnly Cookie, 10분) + Refresh Token (HttpOnly Cookie, 7일)
- Refresh Token Rotation 적용
- AT 만료 시 클라이언트에서 자동 갱신

### 인증 API

| Method | URL                 | 설명         | 인증         |
| ------ | ------------------- | ------------ | ------------ |
| POST   | /api/auth/register  | 회원가입     | X            |
| POST   | /api/auth/login     | 로그인       | X            |
| GET    | /api/auth/me        | 내 정보 조회 | O            |
| POST   | /api/auth/logout    | 로그아웃     | O            |
| POST   | /api/auth/refresh   | AT 재발급    | X (RT 쿠키)  |

### Todo API

| Method | URL            | 설명      | 인증       |
| ------ | -------------- | --------- | ---------- |
| GET    | /api/todos     | 목록 조회 | X          |
| GET    | /api/todos/:id | 단건 조회 | X          |
| POST   | /api/todos     | 생성      | O          |
| PATCH  | /api/todos/:id | 완료 토글 | O (본인만) |
| DELETE | /api/todos/:id | 삭제      | O (본인만) |

## 프로젝트 구조

```
auth-playground/
├── client/
│   └── src/
│       ├── app/
│       │   ├── layout.tsx       # Header prefetch + QueryClientProvider
│       │   ├── page.tsx         # RSC + HydrationBoundary
│       │   ├── header.tsx       # 로그인 상태 표시 + 로그아웃
│       │   ├── login/page.tsx
│       │   └── register/page.tsx
│       ├── features/
│       │   ├── auth/            # 인증 API, 쿼리, 타입
│       │   └── todos/           # Todo API, 쿼리, 타입, 컴포넌트
│       └── utils/
│           └── fetch.ts         # 공통 fetcher (401 자동 갱신)
└── server/
    ├── modules/
    │   ├── auth/
    │   │   ├── routes.ts
    │   │   ├── controller.ts
    │   │   ├── middleware.ts
    │   │   ├── token.ts         # AT/RT 생성 및 쿠키 유틸
    │   │   └── constants.ts     # JWT 시크릿, 토큰 만료 시간
    │   └── todos/
    │       ├── routes.ts
    │       └── controller.ts
    └── prisma/
        └── schema.prisma
```

## 시작하기

### 환경변수 설정

```bash
# server/.env
DATABASE_URL="postgresql://..."
JWT_SECRET="your_access_token_secret"
JWT_REFRESH_SECRET="your_refresh_token_secret"
```

### 설치 및 실행

```bash
# 의존성 설치
npm install
npm install --prefix client
npm install --prefix server

# DB 마이그레이션
cd server && npx prisma migrate dev

# 개발 서버 실행 (client + server 동시)
npm run dev
```

- Client: http://localhost:3000
- Server: http://localhost:4000
