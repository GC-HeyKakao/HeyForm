import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from "recoil";
import { ShareSurvey } from './components/Survey/ShareSurvey';
import { SurveySheet } from './components/Survey/SurveySheet';
import { UpperNav } from './components/UpperNav.js';
import { CreateSurvey } from './route/CreateSurvey.js';
import { GuidePage } from './route/GuidePage.js';
import { KakaoLogin } from './route/KakaoLogin';
import { KakaoLogout } from './route/KakaoLogout';
import { MainPage } from './route/MainPage.js';
import { MyPage } from './route/MyPage';
import { NotFound } from './route/NotFound.js';
import { Workspace } from './route/Workspace.js';

function App() {

  return (
    <>
    <RecoilRoot>
      <UpperNav />
      <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/main" element={<MainPage />}/>
        <Route path="/create" element={<CreateSurvey />}/>
        <Route path="/workspace" element={<Workspace />}/>
        <Route path="/guide" element={<GuidePage />}/>
        <Route path="/mypage" element={<MyPage />}/>
        <Route path="/kakaologin" element={<KakaoLogin/>}/>
        <Route path="/kakaologout" element={<KakaoLogout/>}/>
        <Route path="/survey" element={<ShareSurvey/>}/>
        <Route path="/survey/:surveyId" element={<SurveySheet/>}/>
        {/* <Route path="/reply/:userId:surveyId" element={<RepliedSurveySheet/>}/> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </RecoilRoot>

    </>
  );
}

export default App;
