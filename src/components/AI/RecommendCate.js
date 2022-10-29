import axios from 'axios';

const RecommendCate = async (surveyTitle, category_list) => {

    console.log("surveyTitle", surveyTitle);
    console.log("category_list", category_list);
    let matched_keyword = null;
    let reference_keyword = null;
    console.log('****');

    // 모든 설문 정보 가져오기
    await axios.post(`http://210.109.60.38:8080/survey/title/recommand?categories=${category_list}&title=${surveyTitle}`)
        .then((response) => {
            console.log('****', response);
            console.log('****');
            console.log("matched_keyword 카테고리: ", response.data.matched_keyword)
            console.log("reference_keyword 카테고리: ", response.data.reference_keyword)
            matched_keyword = response.data.matched_keyword;
            reference_keyword = response.data.reference_keyword;
            //SurveyInfo = JSON.stringify(response.data);
        }) 
        .catch((error) => {
            console.log(error)
        })

    return reference_keyword;
}
export { RecommendCate };