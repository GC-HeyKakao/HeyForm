import axios from 'axios';

const GetUserAnswer = async () => {

    let Answers = null;
    const id = 4;

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 모든 답변 정보 가져오기
    const response = await axios.get(`http://210.109.60.38:8080/answer/user/${id}`, headers)
        .then((response) => {
            console.log('get all answer ok');
            console.log(response.data)
            Answers = JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error)
        })

    console.log('GetAllAnswer');
    console.log(Answers);
}

export { GetUserAnswer };