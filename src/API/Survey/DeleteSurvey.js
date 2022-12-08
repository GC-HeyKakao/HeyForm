import axios from 'axios';

const DeleteSurvey = async (surveyId) => {

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 특정 survey 삭제하기
    const response = axios.delete(`http://210.109.60.38:8000/survey/{surveyId}?surveyId=${surveyId}`, headers)
        .then((response) => {
            console.log('delete survey (id:' + surveyId + ') ok');
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}

export { DeleteSurvey };