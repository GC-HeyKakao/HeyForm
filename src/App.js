import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from "recoil";
import { SurveySheet } from './components/Survey/SurveySheet';
import { CreateSurvey } from './route/CreateSurvey.js';
import { GuidePage } from './route/GuidePage.js';
import { KakaoLogin } from './route/KakaoLogin';
import { KakaoLogout } from './route/KakaoLogout';
import { MainPage } from './route/MainPage.js';
import { MyPage } from './route/MyPage';
import { NotFound } from './route/NotFound.js';
import { Workspace } from './route/Workspace.js';
import { useState } from 'react';


// @mui
import { styled } from '@mui/material/styles';
//
import Header from './components/Header';
import Nav from './components/nav'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflowX: 'hidden',
  minHeight: '100%',
  // paddingTop: APP_BAR_MOBILE + 5,
  // paddingBottom: theme.spacing(3),
  // paddingLeft: theme.spacing(3),
  // paddingRight: theme.spacing(3),
  // [theme.breakpoints.up('lg')]: {
  //   // paddingTop: APP_BAR_DESKTOP + 15,
  // },
}));

function App() {

  if (process.env.NODE_ENV == 'production') {
    console.log("Production Mode");
  } else if (process.env.NODE_ENV == 'development') {
    console.log("Development Mode");
  }

  //배포환경에서 콘솔 로그 지우기
  if (process.env.NODE_ENV == "production") {
    console.log = function no_console() { };
    console.warn = function no_console() { };
    console.error = function no_console() { };
    console.info = function no_console() { };
    
    // console.warn = console.error = () => {};
  }
  const [open, setOpen] = useState(false);


  return (
    <>
      <RecoilRoot>
      {/* <StyledRoot> */}

          <Header onOpenNav={() => setOpen(true)} />
          <Nav openNav={open} onCloseNav={() => setOpen(false)} />

          {/* <Nav openNav={open} onCloseNav={() => setOpen(false)} /> */}
          <Main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/create" element={<CreateSurvey />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/kakaologin" element={<KakaoLogin />} />
            <Route path="/kakaologout" element={<KakaoLogout />} />
            <Route path="/survey/:surveyId" element={<SurveySheet />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Main>
        {/* </StyledRoot> */}
      </RecoilRoot>

    </>
  );
}

export default App;
