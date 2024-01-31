# incentive community FRONTEND

## 기능 목록

- 회원 가입과 로그인
- 메인페이지에서 모든 Post를 조회할 수 있고 새로운 Post를 작성
- 마이페이지에서 작성한 글같은 활동을 볼 수 있고 자신의 Post를 조회 삭제
- Framer motion과 CSS를 이용해 페이지 이동과 팝업 등의 액션에 애니메이션
- 화면의 크기에 따라 반응형으로 제작
- Redux를 사용해 전역적으로 상태 관리
- TanStack Query를 이용해 http 통신하고 데이터 관리
- Modal, Textarea, Input 등 UI 제작

## 프로젝트 구성

├── public<br/>
├── src<br/>
├──── components<br/>
├────── auth: 회원 가입, 로그인, 로그아웃<br/>
├────── mypage: 마이페이지에 생성되는 My Post 등 관련 컴퍼넌트<br/>
├────── post: 메인페이지에 생성되는 Post 관련 컴퍼넌트<br/>
├────── profile: 우측에 생성되는 프로필 관련 컴퍼넌트<br/>
├────── UI: 공통으로 사용되는 UI 컴퍼넌트<br/>
├──── hooks : validation, popup 애니메이션 custom hooks<br/>
├──── pages : Page 컴퍼넌트<br/>
├──── store : Redux 를 이용해 state 관리<br/>
├──── util : util 함수, http 요청 함수, validation 함수<br/>
├─── App.js<br/>
├─── index.css<br/>
├─── index.js<br/>
├─── Router.js<br/>
└─ README.md<br/>

## 사용한 기술 스택 및 라이브러리

Javascript, React, CSS Module, Framer Motion, TanStack Query, Redux, ReactDom

## 설치

$ npm install 로 설치 후 $ npm start 로 실행
