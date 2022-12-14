import axios from 'axios';

const GetUserAnswer = async (id) => {

    let Answers = null;

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 모든 답변 정보 가져오기
    const response = await axios.get(`https://210.109.63.71:8080/answer/user/${id}`, headers)
        .then((response) => {
            // console.log(response.data)
            Answers = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

    return Answers;
}

export { GetUserAnswer };