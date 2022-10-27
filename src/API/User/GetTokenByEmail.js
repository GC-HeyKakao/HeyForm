import axios from 'axios';
import { tokenState, userState } from '../../atom';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { useRecoilState } from 'recoil';

const GetTokenByEmail = (users) => {

    console.log("get token 시작");
    
    //const [token, tokenHandler] = useRecoilState(tokenState);
    //const tokenHandler = useSetRecoilState(tokenState);

    let email = users.email;
    //let email = users.email; //리코일

    axios.get(`http://210.109.60.38:8080/user/token/${email}`)
        .then((response) => {
            console.log("ttoken", response.data);
             
            //tokenHandler(response.data);
            //user.token = response.data; //리코일
            console.log('get token ok');
            window.localStorage.setItem("ttoken", response.data);
        })
        .catch((error) => {
            console.log(error);
            console.error(error.response.data);
            return "error";
        })

}

export { GetTokenByEmail };