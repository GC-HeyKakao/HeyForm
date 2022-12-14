import axios from 'axios';

const DeleteSurvey = async (users, surveyId) => {

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 특정 survey 삭제하기
    const response = axios.delete(`https://210.109.63.71:8080/survey/{surveyId}?surveyId=${surveyId}&userToken=${users.token}`, headers)
        .then((response) => {
            console.log('delete survey (id:' + surveyId + ') ok');
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}

export { DeleteSurvey };