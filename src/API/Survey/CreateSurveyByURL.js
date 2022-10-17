import axios from 'axios';

const CreateSurveyByURL = async (props) => {

    const surveyURL = props.surveyURL;
    const headers = {
        Authorization: localStorage.getItem('token')
    };

    axios.post(`http://210.109.61.98:8080/survey/paper/${surveyURL}`, headers)
        .then((response) => {
            console.log(response)
            console.log('create survey paper ok');
        })
        .catch((error) => {
            console.log(error)         
        })
}

export { CreateSurveyByURL };