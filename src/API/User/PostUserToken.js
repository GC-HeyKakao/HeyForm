import axios from 'axios';
import { PostUser } from './PostUser';

const PostUserToken = async (ACCESS_TOKEN, REFRESH_TOKEN, users, userHandler) => {

    console.log("post token 시작");
    console.log(users);
    let post = false;

    await axios.post(`https://210.109.60.38:8080/user/token/request?Kakaotoken=${ACCESS_TOKEN}`)
        .then((response) => {
            console.log('PostUserToken ok');
            console.log('response.data.token', response.data.token);
            userHandler(
                {
                    token: response.data.token,
                    kakaoToken: ACCESS_TOKEN,
                    kakaoRefreshToken: REFRESH_TOKEN,
                    id: response.data.id,
                    name: users.name,
                    email: users.email,
                    age: users.age,
                    gender: users.gender,
                    isFirst: false,
                    push: false,
                    login: true,
                }
            )
            console.log('PostUserToken ok');
            console.log(users);
            //reset(response.data);
        })
        .catch((error) => {
            console.log(error);
            return "error";
        })
        .finally(() => {
            PostUser(users);
            console.log('post user (server)');
            post = true;
        })

    return post;

}

export { PostUserToken };
