import axios from 'axios';

const GetRecommendCategory = async (surveyTitle, category_list) => {

    console.log("surveyTitle", surveyTitle);
    console.log("category_list", category_list);
    let matched_keyword = null;
    let reference_keyword = null;

    await axios.post(`https://210.109.63.71:8080/survey/title/recommand?categories=${category_list}&title=${surveyTitle}`)
        .then((response) => {;
            console.log("matched_keyword 카테고리: ", response.data.matched_keyword)
            console.log("reference_keyword 카테고리: ", response.data.reference_keyword)
            matched_keyword = response.data.matched_keyword;
            reference_keyword = response.data.reference_keyword;
        }) 
        .catch((error) => {
            console.log(error)
        })

    return reference_keyword;
}
export { GetRecommendCategory };


