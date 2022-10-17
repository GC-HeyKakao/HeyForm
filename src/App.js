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
  // useEffect(()=> {
  //   navigate("/main");//최초 1번 실행
  // }, []) 

  // let UserInfo = useContext(UserInfoContextStore);

  // function saveContext() {
	// 		if (localStorage.getItem('id') !== '-1' && UserInfo.id === null) {
	// 			UserInfo.setToken(localStorage.getItem('token'));
	// 			UserInfo.setId(localStorage.getItem('id'));
	// 			UserInfo.setName(localStorage.getItem('name'));
	// 			UserInfo.setEmail(localStorage.getItem('email'));
	// 			UserInfo.setGender(localStorage.getItem('gender'));
	// 			UserInfo.setAge_range(localStorage.getItem('age_range'));
	// 			UserInfo.setPush(localStorage.getItem('push'));
	// 			UserInfo.setFirst(localStorage.getItem('first'));
	// 			UserInfo.setToken(localStorage.getItem('token'));
	// 			console.log("save Context");
	// 		} else {
	// 			console.log('save Context fail');
	// 		}
	// }

	// function saveLocal() {
	// 		if (UserInfo.id !== '-1' && localStorage.getItem('id') === 'null') {
	// 			console.log('save local -user info token')
	// 			localStorage.setItem('token', UserInfo.token);
	// 			localStorage.setItem('id', UserInfo.id);
	// 			localStorage.setItem('name', UserInfo.name);
	// 			localStorage.setItem('email', UserInfo.email);
	// 			localStorage.setItem('gender', UserInfo.gender);
	// 			localStorage.setItem('age_range', UserInfo.age_range);
	// 			localStorage.setItem('first', UserInfo.first);
	// 			console.log("save LocalStorage");
	// 		} else {
	// 			console.log('save LocalStorage fail');
	// 		}
	// }

	// function ToString() {
	// 	if (UserInfo.id !== null) {
	// 		if (UserInfo.id === -1) {
	// 			UserInfo.setId('-1');
	// 		}
			
	// 	}
	// 	if (UserInfo.first != null) {
	// 		if (UserInfo.first===true) {
	// 			UserInfo.first = 'true';
	// 		}
	// 	}
	// }

  // useEffect(() => {
  //   saveContext();
  //   saveLocal();
  //   ToString();

  // });

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
