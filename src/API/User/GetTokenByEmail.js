import axios from 'axios';
import { GetUserIdByEmail } from './GetUserIdByEmail';

const GetTokenByEmail = (users, userHandler) => {

    console.log("get token 시작");

    let email = users.email;
    let token;
    console.log("email", email);
    //let email = users.email; //리코일

    function reset(token) {

        console.log("token reset", token);
		userHandler(
			{
                token: '',
                kakaoToken: users.kakaoToken,
                kakaoRefreshToken: users.kakaoRefreshToken,
                id:users.id,
				name:users.name,
                profileImg: users.profileImg,
				email:users.email,
				age:users.age,
				gender:users.gender,
				isFirst: false,
				push: false,
                login: true,
			}
		)
	}

    axios.get(`https://210.109.63.71:8080/user/token/${email}`)
        .then((response) => {
             
            //tokenHandler(response.data);
            //user.token = response.data; //리코일
            token = response.data;
            console.log('get token ok', token);
            reset(token);
            //GetUserIdByEmail(users, userHandler, token);
            // window.localStorage.setItem("ttoken", response.data);
        })
        .catch((error) => {
            console.log(error);
            console.error(error.response.data);
            return "error";
        })

        return token;
}

export { GetTokenByEmail };
