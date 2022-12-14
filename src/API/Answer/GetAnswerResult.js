import axios from 'axios';

const GetAnswerResult = async (surveyId) => {

    let AnswersResult = null;
    console.log(surveyId);
    // 모든 답변 정보 가져오기
    const response = await axios.get(`https://210.109.63.71:8080/answer/survey/result/${surveyId}`)
        .then((response) => {
            console.log('get answer result ok');
            console.log(response.data)
            AnswersResult = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

    console.log('AnswersResult', AnswersResult);

    return AnswersResult;
}

export { GetAnswerResult };