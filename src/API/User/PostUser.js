import axios from 'axios';

const PostUser = async () => {
    // /survey/post/{userAccount}

    const data = {
        account: localStorage.getItem('token'),
        age: parseInt(localStorage.getItem('age')),
        email: localStorage.getItem('email'),
        id: parseInt(localStorage.getItem('id')),
        name: localStorage.getItem('name'),
    };
    const headers = {
        Authorization: localStorage.getItem('token')
    };

    const response = await axios.get('http://210.109.61.98:8080/user');
    let Users = JSON.stringify(response.data);
    console.log(Users);

    if (!Users.includes(localStorage.getItem('email'))) {
        axios.post("http://210.109.61.98:8080/user/register", data, headers)
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
