import axios from 'axios';

const GetAllQuestion = async () => {

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    // 모든 질문 정보 가져오기
    const response = await axios.get('http://210.109.60.38:8000/question', headers)
        .then((response) => {
            console.log('get all question ok');
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

    let Questions = JSON.stringify(response.data);

    console.log('GetAllQuestion');
    console.log(Questions);
}

export { GetAllQuestion };