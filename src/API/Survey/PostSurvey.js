import axios from 'axios';

const PostSurvey = async () => {

    const data = {
        surveyJson: {"surveyDto":{"survey_id":4,"survey_state":0,"survey_url":"www.heykakao.com/sample"},"questionDtos":[{"question_type":2,"question_order":1,"question_contents":"qs sample1 bla bla","choiceDtos":[]},{"question_type":1,"question_order":2,"question_contents":"qs sample2 bla bla","choiceDtos":[{"choice_order":1,"choice_contents":"ch_sample1 bla bla bla"},{"choice_order":2,"choice_contents":"ch_sample2 bla bla bla"}]}]},
        userAccount: localStorage.getItem('token')
    };
    const headers = {
        Authorization: localStorage.getItem('token')
    };

    axios.post(`http://210.109.61.98:8080/survey/{userAccount}?surveyJson=${data.surveyJson}&userAccount=${data.userAccount}`, headers)
        .then((response) => {
            console.log(response)
            console.log('post survey ok');
        })
        .catch((error) => {
            console.log(error)         
        })
}

export { PostSurvey };