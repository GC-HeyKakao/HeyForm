import axios from 'axios';

const GetAllSurvey = async () => {

    let Surveys = null;

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 모든 설문 정보 가져오기
    const response = await axios.get('https://210.109.63.71:8080/survey', headers)
        .then((response) => {
            console.log('get all survey ok');
            console.log(response.data)
            Surveys = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    
    console.log('GetAllSurvey');
    console.log(Surveys);
}

export { GetAllSurvey };