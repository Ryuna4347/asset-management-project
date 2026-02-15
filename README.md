# Asset Management Project

자산 관리와 포트폴리오 분석을 위한 올인원 금융 플랫폼

## 프로젝트 소개

이 프로젝트는 개인 투자자들이 다양한 자산(주식, 채권, 현금, 암호화폐 등)을 효율적으로 관리하고 분석할 수 있는 웹 애플리케이션입니다.
실시간 포트폴리오 추적, 자동화된 배당금 관리, 다중 통화 지원 등 투자자들에게 필요한 핵심 기능을 제공합니다.

### 주요 기능

- 실시간 자산 현황 대시보드
- 다중 통화 지원 (KRW, USD 등)
- 포트폴리오 분석 및 자산 배분 시각화
- 배당금 추적 및 예측
- 실시간 환율 적용 및 기록
- 반응형 디자인으로 모바일 지원

## 기술 스택

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**:
  - Zustand (클라이언트 상태)
  - React Query (서버 상태)
- **Charts**: Recharts
- **Form Handling**: React Hook Form
- **Components**:
  - @headlessui/react (접근성)
  - @tailwindcss/forms (폼 스타일링)

### Backend

- **Framework**: NestJS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **API Documentation**: Swagger
- **Validation**: class-validator

### DevOps

- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Version Control**: Git
- **CI/CD**: GitHub Actions

## 프로젝트 구조

프로젝트는 모노레포로 구성되어 있으며, frontend와 backend 앱을 효율적으로 관리합니다.

```
[프로젝트 구조 상세]
```

## API 설계

RESTful API를 통해 프론트엔드와 백엔드가 통신합니다.

```
[API 엔드포인트 상세]
```

## 데이터베이스 설계

Supabase를 활용한 관계형 데이터베이스 구조입니다.

```sql
[데이터베이스 스키마 상세]
```

## 시작하기

1. **저장소 클론**

   ```bash
   git clone [repository-url]
   cd asset-management
   ```

2. **의존성 설치**

   ```bash
   pnpm install
   ```

3. **환경 변수 설정**

   ```bash
   cp .env.example .env
   ```

4. **개발 서버 실행**
   ```bash
   pnpm dev
   ```

## 개발 일정

6주 간의 개발 일정으로 진행되며, 2인 개발 팀(풀스택 1명, 프론트엔드 1명)이 참여합니다.

[개발 일정 상세]

## 팀 구성 및 역할

- **풀스택 개발자**

  - 데이터베이스 설계 및 구현
  - API 개발
  - 인프라 구축

- **프론트엔드 개발자**
  - UI/UX 구현
  - 상태 관리
  - 데이터 시각화

## 디자인 참고

- The Rich 앱 디자인 참고
- 모던하고 직관적인 UI/UX
- 반응형 디자인으로 모바일 지원

## 성과 지표

- 사용자 경험 최적화
- 실시간 데이터 처리
- 확장 가능한 아키텍처

## 기여하기

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## 라이센스

This project is licensed under the MIT License - see the LICENSE file for details
