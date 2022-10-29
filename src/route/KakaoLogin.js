import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext, useReducer } from "react";
import { KAKAO_AUTH_URL, REDIRECT_URI, REST_API_KEY } from '..//OAuth';
import { Modal } from 'react-bootstrap'
import { PostUser } from '../API/User/PostUser';
import { userState } from '../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function KakaoLogin() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const users = useRecoilValue(userState);
    const userHandler = useSetRecoilState(userState);

    useEffect(() => {

    }, [users]);

    const location = useLocation();
    const navigate = useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];
    const grant_type = "authorization_code";
    let ACCESS_TOKEN = '';
    let age;

    function setAgeRange(age) {

        if (age == "0~9" || age == "10~19") {
            age = "10대 이하"
        }
        else if (age == "20~29") {
            age = "20대"
        }
        else if (age == "30~39") {
            age = "30대"
        }
        else if (age == "40~49") {
            age = "40대"
        }
        else if (age == "50~59") {
            age = "50대"
        }
        else {
            age = "60대 이상"
        }

    }

    const getKakaoToken = () => {
        fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
            .then(res => res.json())
            .then(data => {
                if (data.access_token) {
                    console.log(data);
                    ACCESS_TOKEN = data.access_token;
                    localStorage.setItem('token', ACCESS_TOKEN);
                    getUserInfo();
                    navigate('/main');
                } else {
                    navigate('/main');
                    console.log("로그인 실패");
                }

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
                    let isFirst = null;

                    if (isFirst === null) {
                        isFirst = true;

                    }
                    // if (localStorage.getItem('count') === null) {
                    //     localStorage.setItem('count', 0);
                    // }

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

                    userHandler([
                        ...users,
                        {
                            token: ACCESS_TOKEN,
                            id: data.id,
                            name: data.kakao_account.profile.nickname,
                            email: data.kakao_account.email,
                            age: age,
                            gender: data.kakao_account.gender,
                            isFirst: true,
                            push: false,

                        }
                    ])
                    localStorage.setItem('name', data.kakao_account.profile.nickname);

                    navigate('/main');
                } else {

                    console.log("유저 정보 가져오기 실패");
                }

            });

    };

    useEffect(() => {
        handleShow();
        setTimeout(function () {
            getKakaoToken();
        }, 500);
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
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