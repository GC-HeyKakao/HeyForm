import axios from 'axios';

const UpdateSurvey = async () => {
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
            survey_id: parseInt(2),
            survey_state: parseInt(0),
            survey_title: "string",
            survey_url: "string"
        }
    }

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    axios.post(`http://210.109.61.98:8080/survey/update`, body, headers)
        .then((response) => {
            console.log(response)
            console.log('update survey ok');
        })
        .catch((error) => {
            console.log(error)
        })
}

export { UpdateSurvey };