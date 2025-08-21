# AI/DX 업무 역량 진단 테스트

AI/DX 업무 역량을 평가하고 개선점을 찾아보는 웹 애플리케이션입니다.

## 기능

- 10개의 상황별 문제를 통한 AI/DX 역량 평가
- 실시간 진행률 표시
- 결과 분석 및 맞춤형 추천 제공
- 소셜 미디어 공유 기능
- Sheet.best를 통한 결과 저장
- 이미지 생성 프롬프트 제공

## Sheet.best 설정

1. [Sheet.best](https://sheet.best) 계정 생성
2. Google Sheets 생성 후 다음 컬럼 추가:
   - timestamp
   - score
   - level
   - title
   - userAgent
   - referrer
3. Sheet.best에서 API 엔드포인트 생성
4. `src/components/Result.jsx` 파일의 `YOUR_SHEET_ID`를 실제 Sheet ID로 교체

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## Netlify 배포

1. GitHub 저장소 생성 및 코드 푸시
2. Netlify 계정에서 "New site from Git" 선택
3. GitHub 저장소 연결
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy 클릭

## 기술 스택

- **프론트엔드**: React + Vite
- **스타일링**: TailwindCSS
- **데이터 저장**: Sheet.best
- **호스팅**: Netlify

## 환경 변수

Sheet.best API를 사용하려면 환경 변수 설정이 필요합니다:

```env
VITE_SHEET_BEST_URL=https://sheet.best/api/sheets/YOUR_SHEET_ID
```

## 라이선스

MIT
