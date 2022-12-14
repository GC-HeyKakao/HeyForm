import axios from 'axios';

const GetSurveyBySurveyId = async (surveyId, users, userHandler) => {

    let SurveyInfo = null;
      
    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 모든 설문 정보 가져오기
    const response = await axios.get(`https://210.109.63.71:8080/survey/list/${surveyId}?userToken=${users.token}`, headers)
        .then((response) => {
            SurveyInfo = response.data;
        })
        .catch((error) => {
            console.log(error)
        })

    return SurveyInfo;
}

export { GetSurveyBySurveyId };