import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext, useReducer } from "react";
import { KAKAO_AUTH_URL, REDIRECT_URI, REST_API_KEY } from '..//OAuth';
import { Modal } from 'react-bootstrap'
import { UserInfoContextStore } from '..//UserInfoContext';
import axios from 'axios';

function KakaoLogin() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const location = useLocation();
    const navigate = useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];
    const grant_type = "authorization_code";
    let ACCESS_TOKEN = localStorage.getItem('token');

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
                    // console.log(UserInfo);
                    getUserInfo();
                } else {
                    navigate('/mypage');
                    console.log("로그인 실패");
                }

            });

    };
    
    const getUserInfo = () => {


        fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
            body: `grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    console.log(data);
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('name', data.kakao_account.profile.nickname);
                    localStorage.setItem('email', data.kakao_account.email);
                    if (localStorage.getItem('first') === null) {
                        localStorage.setItem('first', true);
                    }
                    if (localStorage.getItem('count') === null) {
                        localStorage.setItem('count', 0);
                    }
                    localStorage.setItem('age', data.kakao_account.age_range);
                    localStorage.setItem('gender', data.kakao_account.gender); //male, female
                    localStorage.setItem('push', false);
                    navigate('/main');
                } else {
                    //navigate('/mypage');
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