import axios from 'axios';

const CreateSurveyByURL = async (props) => {

    const surveyURL = '6512bd43d9caa6e02c990b0a82652dca';
    const headers = {
        Authorization: localStorage.getItem('token')
    };
    const url = null;

    axios.get(`http://210.109.61.98:8080/survey/paper/${surveyURL}`, headers)
        .then((response) => {
            console.log(response.request.responseURL)
            console.log('create survey paper ok');
            url = response.request.responseUR;
        })
        .catch((error) => {
            console.log(error)         
        })
}

export { CreateSurveyByURL };