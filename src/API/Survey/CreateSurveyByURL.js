import axios from 'axios';

const CreateSurveyByURL = async (link) => {

    //console.log("create Survey By url");
    const surveyURL = link;

    //console.log("urllink", surveyURL);
    let dto = {};

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    console.log('cre resp');

    const response = await axios.get(`https://210.109.60.38:8080/survey/paper/${surveyURL}`, headers)
        .then((response) => {
            dto = response.data;
            window.localStorage.setItem("questionDto", JSON.stringify(dto));
            console.log('create survey paper by url ok(get dto)');

        })
        .catch((error) => {
            console.log(error);
            console.error(error.response.data);
        })

    return dto;

}

export { CreateSurveyByURL };