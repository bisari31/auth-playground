# 커밋 컨벤션

Conventional Commits 형식을 따릅니다.

## 형식

```
<type>(<scope>): <message>
```

## scope

| scope | 설명 |
|---|---|
| `client` | client/ 관련 변경 |
| `server` | server/ 관련 변경 |
| `root` | 루트 설정 관련 변경 |

## type

| type | 설명 |
|---|---|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `chore` | 빌드/패키지/설정 변경 |
| `refactor` | 리팩토링 |
| `docs` | 문서 수정 |

## 예시

```
feat(client): Todo 목록 페이지 구현
feat(server): CORS 설정 추가
chore(client): react-query 패키지 설치
refactor(client): query factory 패턴 적용
```

## 규칙

- client와 server 변경은 **각각 별도 커밋**으로 분리
- 메시지는 **한국어**로 작성
- 여러 기능이 포함된 경우 **기능 단위로 커밋을 분리**
  - 패키지 설치 (`chore`) 와 기능 구현 (`feat`) 은 별도 커밋
  - 서로 다른 기능은 각각 커밋 (예: API 분리 리팩토링 / Suspense 적용은 별도)
- 커밋 순서는 **의존성 순서**를 따름 (예: 패키지 설치 → 기능 구현)

# 네이밍 컨벤션

## 폴더명 / 파일명
- **케밥 케이스** 사용
- 예: `auth/`, `todo-list/`, `header.tsx`, `todo-list.tsx`
- 단, Next.js 예약 파일 제외 (`page.tsx`, `layout.tsx`, `providers.tsx` 등)
