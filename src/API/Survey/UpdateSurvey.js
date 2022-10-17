import axios from 'axios';

const UpdateSurvey = async () => {

    const data = {
        surveyJson: 'test',
        userAccount: localStorage.getItem('token')
    };
    const headers = {
        Authorization: localStorage.getItem('token')
    };

    axios.post(`http://210.109.61.98:8080/survey/update/?surveyJson=${data.surveyJson}`, headers)
        .then((response) => {
            console.log(response)
            console.log('update survey ok');
        })
        .catch((error) => {
            console.log(error)         
        })
}

export { UpdateSurvey };