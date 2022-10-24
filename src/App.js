import React from 'react';
import { useEffect, useContext } from 'react';
import './App.css';

import {Routes, Route, useNavigate} from 'react-router-dom'
import { MainPage } from './route/MainPage.js'
import { UpperNav } from './components/UpperNav.js'
import { CreateSurvey } from './route/CreateSurvey.js'
import { Workspace } from './route/Workspace.js'
import { GuidePage } from './route/GuidePage.js'
import { MyPage } from './route/MyPage';
import { KakaoLogin}  from './route/KakaoLogin';
import { KakaoLogout } from './route/KakaoLogout';
import { ShareSurvey } from './components/Survey/ShareSurvey';
import { SurveySheet } from './components/Survey/SurveySheet';
import { RepliedSurveySheet } from './components/Survey/Reply/RepliedSurveySheet';
import { Users } from './API/Users'

function App() {
  let navigate = useNavigate();


  return (
    <>
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
        <Route path="/reply/:userId:surveyId" element={<RepliedSurveySheet/>}/>
        <Route path="/Users" element={<Users />}/>
      </Routes>


    </>
  );
}

export default App;
