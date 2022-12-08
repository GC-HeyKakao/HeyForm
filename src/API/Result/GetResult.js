import axios from 'axios';

const GetResult = async (id) => {

    let result = null;
    const surveyId = id;
    // const surveyId = 85;

    // 모든 설문 정보 가져오기
    const response = await axios.get(`http://210.109.60.38:8000/answer/survey/result/${surveyId}`)
        .then((response) => {

            console.log("GetResult", response.data);
            result = response.data;
            
        })
        .catch((error) => {
            console.log(error)
        })

    return result;
}
export { GetResult };