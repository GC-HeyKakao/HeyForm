import React from 'react';
import { useEffect } from 'react';
import './App.css';

import {Routes, Route, useNavigate} from 'react-router-dom'

import {MainPage} from './route/MainPage.js'
import {UpperNav} from './components/UpperNav.js'
import {CreateSurvey} from './route/CreateSurvey.js'
import {Workspace} from './route/Workspace.js'
import {GuidePage} from './route/GuidePage.js'
import {LoginPage} from './route/LoginPage.js'

function App() {
  let navigate = useNavigate();

  useEffect(()=> {
    navigate("/main");//최초 1번 실행
  }, []) 

  return (
    <>
      <UpperNav />
      <Routes>
        <Route path="/main" element={<MainPage />}/>
        <Route path="/create" element={<CreateSurvey />}/>
        <Route path="/workspace" element={<Workspace />}/>
        <Route path="/guide" element={<GuidePage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </>
  );
}

export default App;
