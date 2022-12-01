import axios from 'axios';

const GetUserIdByEmail = (users, userHandler, token) => {

    console.log("get id 시작");

    let email = users.email;

    function reset(id) {
        console.log('reset id')         

		userHandler(
			{
				token:users.token,
                kakaoToken: users.kakaoToken,
                kakaoRefreshToken: users.kakaoRefreshToken,
                id:id,
				name:users.name,
                profileImg: users.profileImg,
				email:users.email,
				age:users.age,
				gender:users.gender,
				isFirst: false,
				push: users.push,
                login: users.login,
			}
		)
	}

    axios.get(`https://210.109.60.38:8080/user/id/${email}`)
        .then((response) => {    
            reset(response.data);
            
        })
        .catch((error) => {
            console.log(error);
            console.error(error.response.data);
            return "error";
        })

}

export { GetUserIdByEmail };
