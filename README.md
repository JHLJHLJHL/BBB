# BBB

《브레이킹 배드》 다섯 시즌 62편을 한 편씩 풀어 둔 읽을거리. 각 회차마다 줄거리,
제목에 숨은 의미, 명대사, 방영 당시와 이후의 반응, 비하인드, 그리고 팬 커뮤니티에서
반복되는 질문을 정리하고, 흑백 연필 드로잉 삽화를 함께 싣는다.

공개된 사이트: <https://jhljhljhl.github.io/BBB/>

## 실행

```bash
npm install
```

```bash
npm run dev
```

http://localhost:3210 에서 열린다.

| 명령 | 하는 일 |
| --- | --- |
| `npm run dev` | 개발 서버 (포트 3210) |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 빌드 결과 서빙 |
| `npm run typecheck` | 타입 검사만 |
| `npm run build:single` | 정적 익스포트 후 `dist/BBB.html` 한 파일로 합침 |
| `npm run assets` | `ASSETS.md` 재생성 |

## 배포

리포지토리 루트의 `index.html` 이 곧 사이트다. `.github/workflows/pages.yml` 이
`_site/` 를 만들어 그 파일만 GitHub Pages 아티팩트로 올린다. 소스 파일은 배포에
포함되지 않는다.

내용을 고친 뒤 사이트를 갱신하려면:

```bash
npm run build:single && cp dist/BBB.html index.html
```

그리고 `index.html` 을 커밋해 `main` 에 푸시하면 워크플로가 배포한다.

## 스택

Next.js 14 (App Router) · TypeScript · Tailwind CSS 3 · shadcn/ui · Radix UI ·
Framer Motion · Lucide React. 웹폰트를 내려받지 않고 OS 글꼴 스택만 쓰므로
오프라인에서도 그대로 빌드된다. 화면은 다크 테마 하나뿐이다.

## 구조

```
app/
  layout.tsx          루트 레이아웃 · 공용 SVG defs
  page.tsx            AppShell 하나만 렌더
  icon.svg            [Br]/[Ba] 파비콘
  globals.css         디자인 토큰, 종이 질감, 연필 음영 상호작용
components/
  AppShell.tsx        2단 컨테이너 · 해시 라우팅 · 모바일 드로어
  Sidebar.tsx         시즌 아코디언 + 클립보드 푸터
  Hero.tsx            기본 화면 (포스터만)
  EpisodeDetail.tsx   회차 상세 여섯 섹션
  BrandIcon.tsx       앱 내 [Br]/[Ba] 마크
  sketch/
    SketchDefs.tsx    연필 필터, 종이 그레인, 4단계 명암 패턴 (한 번만 마운트)
    motifs.tsx        도판 원본 36종 (400×300)
    Sketch.tsx        도판 렌더러 (흑연 · 밑그림 · 확정선 3패스)
    HeroPoster.tsx    홈 포스터 (480×660)
  ui/                 shadcn 컴포넌트
data/
  types.ts            Episode / Season 타입
  season1–5.ts        본문 데이터
  episodes.ts         집계 · 조회 헬퍼
scripts/
  asset-audit.mjs         ASSETS.md 재생성
  bundle-single-file.mjs  정적 익스포트를 한 파일로 인라인
  serve-dist.mjs          dist/BBB.html 을 로컬에서 확인용으로 서빙
```

## 회차 본문의 구성

`data/season*.ts` 의 `Episode` 객체 하나가 화면 한 개다.

| 필드 | 화면 | 내용 |
| --- | --- | --- |
| `plot` | 01 줄거리 | 문단 배열. 도판이 문단 사이에 자동으로 끼워진다 |
| `titleMeaning` | 02 제목의 의미 | 제목의 출처와 층위 |
| `quotes` | 03 명대사 | 영어 원문 · 한국어 · 화자 · 상황 |
| `reception` | 04 방영 당시와 그 후 | 시청자 수, 평단 반응, 회고 순위, 수상 |
| `trivia` | 05 비하인드 | 출처 라벨과 본문 쌍 |
| `redditQuestions` | 06 자주 나오는 질문 | 해당 회차까지의 내용만으로 답한다 |

`quotes` 와 `reception`, `redditQuestions` 는 선택 항목이라 없으면 섹션이
통째로 빠진다.

### 출처에 관하여

`reception` 은 회차별 Wikipedia 문서의 Reception 섹션을 하나씩 확인해 작성했다.
시즌 단위 문서를 한 번에 요약하면 회차와 내용이 어긋나는 문제가 있어 그렇게 했다.

`redditQuestions` 라는 필드 이름과 달리, 내용은 reddit.com 에서 직접 가져온 것이
아니다. 그 사이트는 이 작업 환경에서 접근이 차단돼 있었다. 팬 커뮤니티에서
반복되는 질문을 다른 경로(팬덤 위키 포럼, TV Tropes, 매체 기사)로 확인해 정리한
것이다. `trivia` 의 출처 라벨도 같은 이유로 `팬덤 논의`, `팬 커뮤니티` 처럼
실제 확인 경로에 맞춰 적었다.

## 삽화 규칙

삽화는 예외 없이 한 가지 규칙만 따른다. **종이 질감 위 흑백 연필 선.** 색도,
사진도, 스틸컷도 쓰지 않는다. 실제 프레임을 따라 그리지 않고, 장면의 구도와
소품 배치를 근거로 선화를 새로 그린다.

- 모든 선은 `currentColor` 로 그린다.
- 음영은 `SketchDefs` 의 4단계 명암 패턴(`bb-t1`~`bb-t4`)과 파쇄 톤(`bb-grit`)으로만 준다.
- `Sketch` 가 같은 도형을 세 번 그린다. 번진 흑연, 어긋난 밑그림, 확정선.
- 손그림 느낌은 `feTurbulence` + `feDisplacementMap` 이 만든다. 글자가 들어간
  도판은 흔들림이 약한 `bb-pencil-fine` 을 쓴다.
- 캔버스는 400×300 고정. 포스터만 480×660.

삽화를 추가하려면 `components/sketch/motifs.tsx` 의 `MotifId` 에 id를 더하고
`MOTIFS` 에 항목을 쓴 뒤, 회차 데이터의 `sketches` 에서 참조한다. 그다음
`npm run assets` 를 돌리면 [ASSETS.md](ASSETS.md) 가 다시 생성되고, 정의만 하고
안 쓴 도판이나 참조만 하고 안 그린 도판이 맨 아래 "감사 결과"에 뜬다.

## 내비게이션

선택한 회차는 URL 해시(`#/s05e14`)에 남으므로 링크로 공유하거나 뒤로 가기로
돌아갈 수 있다. 사이드바 푸터의 메일 주소를 누르면 클립보드에 복사된다.

---

LJH2026 · honeymath.gbe@gmail.com
