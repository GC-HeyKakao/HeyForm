import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../atom';
import { KAKAO_AUTH_URL, REDIRECT_URI, REST_API_KEY } from '../OAuth';

function KakaoLogin() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const users = useRecoilValue(userState);
    const userHandler = useSetRecoilState(userState);

    const location = useLocation();
    const navigate = useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];
    const grant_type = "authorization_code";
    let ACCESS_TOKEN = '';
    let REFRESH_TOKEN = '';
    let ID = '';
    let JWT_TOKEN = '';
    let age;

    const getKakaoToken = () => {
        fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
            .then(res => res.json())
            .then(data => {
                if (data.access_token) {
                    console.log('kakaologin data', data);
                    ACCESS_TOKEN = data.access_token;
                    REFRESH_TOKEN = data.refresh_token;
                    // data.refresh_token_expires_in;
                    //localStorage.setItem('token', ACCESS_TOKEN);
                    getUserInfo();
                } else {
                    console.log("로그인 실패");
                    navigate('/main');
                }

            })
            // 에러처리
            .catch(() => {
                console.log('에러')
            });

    };

    const getUserInfo = () => {
        // console.log('get 시작', UserInfo);
        fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
            body: `grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    if (data.kakao_account.age_range == "0~9" || data.kakao_account.age_range == "10~19") {
                        age = "10대 이하"
                    }
                    else if (data.kakao_account.age_range == "20~29") {
                        age = "20대"
                    }
                    else if (data.kakao_account.age_range == "30~39") {
                        age = "30대"
                    }
                    else if (data.kakao_account.age_range == "40~49") {
                        age = "40대"
                    }
                    else if (data.kakao_account.age_range == "50~59") {
                        age = "50대"
                    }
                    else {
                        age = "60대 이상"
                    }
    
                    userHandler(
                        {
                            token: '',
                            kakaoToken: ACCESS_TOKEN,
                            kakaoRefreshToken: REFRESH_TOKEN,
                            id: 0,
                            name: data.kakao_account.profile.nickname,
                            profileImg: data.kakao_account.profile.profile_image_url,
                            email: data.kakao_account.email,
                            age: age,
                            gender: data.kakao_account.gender,
                            isFirst: users.isFirst,
                            push: false,
                            login: true,
                        }
                    )
                    

                    console.log('ACCESS_TOKEN',ACCESS_TOKEN);
                    axios.post(`https://210.109.63.71:8080/user/token/request?Kakaotoken=${ACCESS_TOKEN}`)
                        .then((response) => {
                            console.log('response.data.token', "-", response.data.token, "-");
                            userHandler(
                                {
                                    token: response.data.token,
                                    kakaoToken: ACCESS_TOKEN,
                                    kakaoRefreshToken: REFRESH_TOKEN,
                                    id: response.data.id,
                                    name: data.kakao_account.profile.nickname,
                                    profileImg: data.kakao_account.profile.profile_image_url,
                                    email: data.kakao_account.email,
                                    age: age,
                                    gender: data.kakao_account.gender,
                                    isFirst: users.isFirst,
                                    push: false,
                                    login: true,
                                }
                            )
                        })
                        .catch((error) => {
                            console.log(error);
                            console.log('jwt가져오기실패');
                            return "error";
                        })

                } else {
                    console.log("유저 정보 가져오기 실패");
                }

            })
            .finally(() => {
                navigate('/main');
            });
    };

    useEffect(() => {
        handleShow();
        setTimeout(function () {
            getKakaoToken();
        }, 1000);
    }, []);

    return (
        <Modal show={show} onHide={handleClose}  >
            <Modal.Header closeButton onClick={() => navigate("/main")}>
                <Modal.Title href={KAKAO_AUTH_URL}>LogIn</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
                <h2>로그인중입니다.<br /></h2>
                <h4>잠시만 기다려주세요 🙏 </h4>
            </Modal.Body>
        </Modal>
    );

}


export { KakaoLogin };

