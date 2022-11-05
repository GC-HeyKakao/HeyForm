import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL, LOGOUT_REDIRECT_URI, REST_API_KEY } from '..//OAuth';

function KakaoLogout() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let ACCESS_TOKEN = localStorage.getItem('token');
    console.log("token", ACCESS_TOKEN);
    const location = useLocation();
    const navigate = useNavigate();

    const refreshKakaoToken = () => {

        // 로그아웃
        fetch('https://kapi.kakao.com/v1/user/logout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    console.log(data.id);
                    Logout();

                } else {
                    //navigate('/mypage');
                    console.log("로그아웃 실패");
                }

            });
    }

    const Logout = () => {
        // 카카오계정과 함께 로그아웃
        fetch(`https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}&state=${ACCESS_TOKEN}`, {
            method: 'GET',
        })
            .then(data => {
                console.log('data:', data);
                if (data.url.includes(ACCESS_TOKEN)) {
                    console.log(data.state);
                    localStorage.removeItem('token');
                    navigate('/main');
                } else {
                    //navigate('/mypage');
                    console.log("카카오 계정과 함께 로그아웃 실패");
                }

            });

    }

    useEffect(() => {
        handleShow()
    });

    useEffect(() => {
        setTimeout(function () {
            refreshKakaoToken()
        }, 500);
    }, []);


    return (

        <Modal show={show} onHide={handleClose}>
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
