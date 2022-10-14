import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store.js'
import { UserInfoContext } from './UserInfoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  //<React.StrictMode>
  //<Provider store={store}>
  <BrowserRouter>
    <UserInfoContext>
      <App />
    </UserInfoContext>
  </BrowserRouter>
  //</Provider>
  //</React.StrictMode>
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// // add 1011

// import axios from 'axios';
// import decode from 'jwt-decode';

// const fetcher = axios.create({
//   baseURL: process.env.REACT_APP_ENDPOINT,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': localStorage.session
//   }
// });

// export const createUser = (params) => {
//   return fetcher.post("/users", params).then(res => res.data);
// };

// export const login = (email, password) => {
//   return fetcher.post("/login", {
//     email,
//     password
//   }).then(res => {
//     localStorage.session = res.data.auth;
//     fetcher.defaults.headers.common['Authorization'] = res.data.auth;
//     return decode(res.data.auth);
//   });
// };

// export const logout = () => {
//   delete localStorage.session;
//   return Promise.resolve();
// };

// export const fetchCurrentUser = () => {
//   return fetcher.get("/users/me").then(res => {
//     return res.data;
//   });
// };

// export const fetchUserSurveys = (user) => {
//   return fetcher.get(`/users/${user.id}/surveys`).then(res => res.data);
// };

// export const fetchResults = (surveyId) => {
//   return fetcher.get(`/surveys/${surveyId}/results`).then(res => res.data);
// };

// export const createSurvey = (userId, initSurvey) => {
//   return fetcher.post(`/users/${userId}/surveys`, initSurvey).then(res => res.data);
// };

// export const saveResult = (surveyId, result) => {
//   return fetcher.post(`/surveys/${surveyId}/results`, result);
// };


// export const fetchSurvey = (surveyId) => {
//   return fetcher.get(`/surveys/${surveyId}`).then(res => res.data);
// };

// export const deleteSurvey = surveyId => {};

// export const updateSurvey = (survey) => {
//   return fetcher.put(`/surveys/${survey.id}`, survey).then(res => res.data);
// };

// export const deleteResults = (surveyId, results) => {
//   return Promise.all(results.map(result => fetcher.delete(`/surveys/${surveyId}/results/${result.id}`)));
// };
