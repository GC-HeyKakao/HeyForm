import axios from 'axios';

const DeleteSurvey = async () => {

    const headers = {
        Authorization: localStorage.getItem('token')
    };
    const data = {
        surveyId: parseInt(3),
    };
    // 특정 survey 삭제하기
    const response = await axios.delete(`http://210.109.61.98:8080/survey/{surveyId}?surveyId=4`, headers)
        .then((response) => {
            console.log('delete survey' + data.surveyId + ' ok');
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

}

export { DeleteSurvey };