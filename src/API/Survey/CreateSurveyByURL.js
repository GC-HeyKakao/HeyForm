import axios from 'axios';

const CreateSurveyByURL = async (link) => {

    console.log("createSurveyByurl");
     const surveyURL = link;
    // console.log("link");
    //const surveyURL = 'c4ca4238a0b923820dcc509a6f75849b';
    console.log("urllink", surveyURL);
    let dto = {};

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    console.log('cre resp');

    const response = await axios.get(`http://210.109.60.38:8080/survey/paper/${surveyURL}`, headers)
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