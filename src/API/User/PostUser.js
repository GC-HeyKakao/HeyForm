import axios from 'axios';
import { GetAllUser } from './GetAllUser';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom';

const PostUser = async (users) => {
    // /survey/post/{userAccount}

    let allUsers = '';
    console.log(users);
    let body = new Object();

    body = {
        account: users.token,
        age: users.age,
        email: users.email,
        gender: users.gender,
        id: users.id,
        name: users.name,
        token: users.token,
    };

    GetAllUser()
        .then((res) => {
            allUsers = res;
            console.log('alluser', allUsers);

            if (allUsers.includes(body.email)) {
                console.log("user already registerd");
            }
            else if (body.email == null) {
                console.log("user don't have email");
            }
            else {
                console.log("user register start");
                console.log(JSON.stringify(body, null, 2))
                axios.post("http://210.109.60.38:8080/user/register", body)
                    .then((response) => {
                        console.log('register user ok');
                        console.log(JSON.stringify(body, null, 2));
                    })
                    .catch((error) => {
                        console.log('register fail');
                        console.log(error)
                    })
                    .finally(() => {
                        console.log('register finish')
                    })
            }

        }, (err) => console.log(err))

}

export { PostUser };
