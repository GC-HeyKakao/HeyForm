import axios from 'axios';

const PostSurvey = async () => {

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    const data = {
        userAccount: localStorage.getItem('token')
    }

    const body = {
        questionDtos: [
            {
                choiceDtos: [
                    {
                        choice_contents: "string",
                        choice_order: parseInt(0)
                    }
                ],
                question_contents: "string",
                question_order: parseInt(0),
                question_type: parseInt(0)
            }
        ],
        surveyDto: {
            survey_id: parseInt(0),
            survey_state: parseInt(0),
            survey_title: "string",
            survey_url: "string"
        }
    }

    axios.post(`http://210.109.61.98:8080/survey/{userAccount}?userAccount=${data.userAccount}`, body, headers)
        .then((response) => {
            console.log(response)
            console.log('post survey ok');
        })
        .catch((error) => {
            console.error(error.response.data);
        })

}
export { PostSurvey };