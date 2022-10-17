import axios from 'axios';

const GetSurveyBySurveyId = async () => {

    let SurveyInfo = null;
    let surveyId = 3; //props로 전달

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 모든 설문 정보 가져오기
    const response = await axios.get(`http://210.109.61.98:8080/survey/list/${surveyId}`, headers)
        .then((response) => {
            console.log('get survey by surveyid ok');
            console.log(response.data)
            SurveyInfo = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    
    console.log('GetSurveyBySurveyId');
    console.log(surveyId, SurveyInfo);
}
export { GetSurveyBySurveyId };