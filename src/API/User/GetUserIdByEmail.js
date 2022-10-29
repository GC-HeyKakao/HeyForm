import axios from 'axios';
import { userIdState, userState } from '../../atom';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { useRecoilState } from 'recoil';

const GetUserIdByEmail = (users) => {

    console.log("get token 시작");

    let email = users.email;

    axios.get(`http://210.109.60.38:8080/user/id/${email}`)
        .then((response) => {
            //console.log("ttoken", response.data);
             
            //tokenHandler(response.data);
            //user.token = response.data; //리코일
            console.log('get token ok');
            window.localStorage.setItem("userID", response.data);
        })
        .catch((error) => {
            console.log(error);
            console.error(error.response.data);
            return "error";
        })

}

export { GetUserIdByEmail };