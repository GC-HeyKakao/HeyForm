import React, { useState, useEffect, useContext, useReducer } from 'react';
import { CreateSurveyByURL } from './Survey/CreateSurveyByURL';
import { DeleteSurvey } from './Survey/DeleteSurvey';
import { GetAllSurvey } from './Survey/GetAllSurvey';
import { GetSurveyByUserAccount } from './Survey/GetSurveyByUserAccount';
import { PostSurvey } from './Survey/PostSurvey';
import { UpdateSurvey } from './Survey/UpdateSurvey';
import { GetAllUser } from './User/GetAllUser';
import { GetTokenByEmail } from './User/GetTokenByEmail';
import { PostUser } from './User/PostUser';


function Users() {

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
    //try {
    
      // const response = await axios.get('http://210.109.60.38:8080/survey/post/test');
      // console.log(response.data);
      // let questionDtos = response.data.questionDtos;
      // console.log(typeof(response.data.questionDtos));
      // let zero = '0';
      // let choiceDtos = response.data.questionDtos;
      // console.log(choiceDtos);
      
      // let surveyDto = response.data.surveyDto;
      // let survey_id = surveyDto.survey_id;
      // let survey_state = surveyDto.survey_state;
      // let survey_url = surveyDto.survey_url;
      // console.log(surveyDto);
      // console.log(survey_id);
      // console.log(survey_state);
      // console.log(survey_url);
      
    // } catch(err) {
    //   console.log("Error >>", err);
    // }

    // /user
    // try {
    //   const response = await axios.get('http://210.109.60.38:8080/user');
    //   console.log(response.data);
      
    // } catch(err) {
    //   console.log("Error >>", err);
    // }


  useEffect(() => {
    //PostUser();
    //GetSurveyBySurveyId();
    //DeleteSurvey();
    //GetAllUser();
    // GetAllSurvey();
    // GetAllQuestion();
    // GetAllAnswer();
    //GetSurveyByUserAccount();
    //DeleteSurvey();
    //PostSurvey();
    //CreateSurveyByURL();
    GetTokenByEmail();

  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
    <h6>{Users}</h6>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
    </>
  );
}


export { Users };