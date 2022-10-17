import axios from 'axios';
import { GetAllUser } from './GetAllUser';

const PostUser = async () => {
    // /survey/post/{userAccount}

    const headers = {
        Authorization: localStorage.getItem('token')
    };

    const body = {
        account: localStorage.getItem('token'),
        age: parseInt(localStorage.getItem('age')),
        email: localStorage.getItem('email'),
        id: parseInt(localStorage.getItem('id')),
        name: localStorage.getItem('name'),
    };

    let Users = JSON.stringify(GetAllUser());
    console.log(typeof(Users));

    if (!Users.includes(localStorage.getItem('email'))) {
        await axios.post("http://210.109.61.98:8080/user/register",headers, body)
            .then((response) => {
                console.log('register user ok');
                console.log(response.data)
            })
            .catch((error) => {
                console.log('register fail');
                console.log(localStorage.getItem('email'))
                console.log(error)
            })

    } else {
        console.log("user already registerd")
    }
}

export {PostUser};
