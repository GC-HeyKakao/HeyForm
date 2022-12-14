import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL, LOGOUT_REDIRECT_URI, REST_API_KEY } from '..//OAuth';
import { userState } from '../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { GetTokenInfo } from "../API/KakaoAPI/GetTokenInfo";
import { RefreshToken } from "../API/KakaoAPI/RefreshToken";

function KakaoLogout() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const users = useRecoilValue(userState);
    const userHandler = useSetRecoilState(userState);
    // let ACCESS_TOKEN = localStorage.getItem('token')
    let ACCESS_TOKEN = users.kakaoToken;

    console.log("token", ACCESS_TOKEN);

    const navigate = useNavigate();

    const resetUser = () => {
        userHandler(
            {
                token: users.token,
                kakaoToken: '',
                kakaoRefreshToken: '',
                id: users.id,
                name: users.name,
                profileImg: users.profileImg,
                email: users.email,
                age: users.age,
                gender: users.gender,
                isFirst: users.isFirst,
                push: users.push,
                login: false,
            }
        )
    }

    const expireToken = () => {
        // 토큰 만료시키기
        fetch('https://kapi.kakao.com/v1/user/unlink', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${users.kakaoToken}` },
        })
            .then(res => {
                console.log(res);
                if(res.status==401) {
                    console.log('이미만료');
                    resetUser();
                    navigate('/');
                    // kakaoLogout();
                } else if (res.status==200) {
                    //토큰이 이미 만료된경우,,
                    console.log('만료성공');
                    resetUser();
                    navigate('/');
                }
            });
    }

    const kakaoLogout = () => {
        // 카카오계정과 함께 로그아웃
        // fetch(`https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`, {
        //     method: 'GET',
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('data:', data);
        //         if (data.url.includes(ACCESS_TOKEN)) {
        //             console.log(data.state);
        //             //localStorage.removeItem('token');
        //             resetUser();
        //             navigate('/main');
        //         } else {
        //             //navigate('/mypage');
        //             console.log("카카오 계정과 함께 로그아웃 실패");
        //         }

        //     });

        const response = axios.get(`https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`)
            .then((response) => {
                console.log('success');
                console.log(response);
            })
            .catch((error) => {
                console.log('에러');
                console.log(error)
            })
            .finally(() => {
                console.log(REST_API_KEY);
                console.log(LOGOUT_REDIRECT_URI);
                console.log('완료')
            })

    }

    const refreshAndExpire = () => {

        fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=refresh_token&client_id=${REST_API_KEY}&refresh_token=${users.kakaoRefreshToken}`,
    })
        .then(res => res.json())
        .then(data => {
            userHandler(
                {
                    token:users.token,
                    kakaoToken:data.access_token,
                    kakaoRefreshToken: users.kakaoRefreshToken,
                    id: users.id,
                    name: users.name,
                    profileImg: users.profileImg,
                    email: users.email,
                    age: users.age,
                    gender: users.gender,
                    isFirst: users.isFirst,
                    push: users.push,
                    login: users.login,
                }
            )
            // PostUserToken(users.token, users.kakaoRefreshToken, users, userHandler);
        });
        return true;

        // RefreshToken(users, userHandler)
        //     .then(res => {
        //         console.log('이게 res', res);
        //         console.log('갱신 완료 후 다시 로그아웃')
        //         if (res) {
        //             console.log(users);
        //             fetch('https://kapi.kakao.com/v1/user/logout', {
        //                 method: 'POST',
        //                 headers: { 'Authorization': `Bearer ${users.kakaoToken}` },
        //             })
        //                 .then(res => res.json())
        //                 .then(data => {
        //                     console.log(data);
        //                     if (data.id) {
        //                         console.log(data.id);
        //                         console.log('다시 로그아웃 성공');
        //                         resetUser();
        //                         navigate('/');
        //                         // kakaoLogout();
        //                     }
        //                 });
        //         }
        //     })
        //     .catch((error) => {
        //         console.log('에러');
        //         console.log(error)
        //     })
    }


    useEffect(() => {
        handleShow()
    });

    useEffect(() => {
        setTimeout(function () {
            expireToken();
        }, 500);
    }, []);

    return (
        <Modal show={show} onHide={handleClose}  >
            <Modal.Header closeButton onClick={() => navigate("/main")}>
                <Modal.Title href={KAKAO_AUTH_URL}>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
                <h2>로그아웃중입니다.<br /></h2>
                <h4>잠시만 기다려주세요 🙏 </h4>
            </Modal.Body>
        </Modal>

    )

}


export { KakaoLogout };
