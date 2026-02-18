# auth-playground

인증(Auth) 학습을 위한 모노레포 프로젝트입니다.

## 기술 스택

### Client
- Next.js 15 (App Router)
- TanStack Query v5
- Tailwind CSS

### Server
- Express 5
- Prisma
- PostgreSQL

## 프로젝트 구조

```
auth-playground/
├── client/
│   └── src/
│       ├── app/
│       │   ├── layout.tsx       # QueryClientProvider 설정
│       │   ├── page.tsx         # RSC + HydrationBoundary
│       │   └── providers.tsx
│       └── todos/
│           ├── api.ts           # fetch 함수
│           ├── queries.ts       # query factory
│           ├── TodoList.tsx     # 폼 + Suspense/ErrorBoundary
│           └── TodoItems.tsx    # useSuspenseQuery 리스트
└── server/
    ├── controllers/
    ├── routes/
    └── prisma/
        └── schema.prisma
```

## 시작하기

### 환경변수 설정

```bash
# server/.env
DATABASE_URL="postgresql://..."
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

## API

| Method | URL | 설명 |
|---|---|---|
| GET | /api/todos | 목록 조회 |
| GET | /api/todos/:id | 단건 조회 |
| POST | /api/todos | 생성 |
| PATCH | /api/todos/:id | 완료 토글 |
| DELETE | /api/todos/:id | 삭제 |
