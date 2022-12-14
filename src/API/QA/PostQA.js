import axios from 'axios';

const PostQA = async (qa) => {
    // console.log("hello qa");
    let post = false;
    
    await axios.post('https://210.109.63.71:8080//qa/save', qa)
        .then((response) => {
            console.log('문의 저장 성공');
            post = true;
            // alert("소중한 의견 감사합니다.😍")
        })
        .catch((error) => {
            console.log(error)
            post = false;
        })
        .finally(() => {
            console.log('응답 저장 완료')
            return post;
        })
}


export { PostQA };

