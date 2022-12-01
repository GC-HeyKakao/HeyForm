import axios from 'axios';

const GetSurveyByToken = async (users, userHandler) => {

    let SurveyInfo = null;
    // let userAccount = localStorage.get('token'); //props로 전달
    let userToken = users.token; //props로 전달

    // 모든 설문 정보 가져오기
    const response = await axios.get(`http://210.109.60.38:8080/survey/total/${userToken}`)
        .then((response) => {
            console.log(response);
                SurveyInfo = response.data;
        })
        .catch((error) => {
            console.log(error)
        })

    return SurveyInfo;
}
export { GetSurveyByToken };