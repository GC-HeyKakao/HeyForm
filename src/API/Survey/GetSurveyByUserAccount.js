import axios from 'axios';

const GetSurveyByUserAccount = async () => {

    let SurveyInfo = null;
    // let userAccount = localStorage.get('token'); //props로 전달
    let userAccount = 'string' //props로 전달

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 모든 설문 정보 가져오기
    const response = await axios.get(`http://210.109.60.38:8080/survey/total/${userAccount}`, headers)
        .then((response) => {
            console.log('get survey by userAccount ok');
            console.log(response.data)
            SurveyInfo = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    
    console.log('GetSurveyBySurveyId');
    console.log(SurveyInfo);
}
export { GetSurveyByUserAccount };