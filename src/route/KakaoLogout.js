import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { KAKAO_AUTH_URL, REDIRECT_URI, LOGOUT_REDIRECT_URI, REST_API_KEY } from '..//OAuth';
import { Modal } from 'react-bootstrap'
import { UserInfoContextStore } from '..//UserInfoContext';

function KakaoLogout() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 유저 정보 관리 context api
    let UserInfo = useContext(UserInfoContextStore);

    let ACCESS_TOKEN = UserInfo.token;
    const location = useLocation();
    const navigate = useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];
    const grant_type = "authorization_code";


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
            //           headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'Authorization': `Bearer ${ACCESS_TOKEN}`
            // }
            //body: `client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}&state=${ACCESS_TOKEN}`,
        })
            //     .then(res => res.json())
            .then(data => {
                console.log('data:', data);
                if (data.url.includes(ACCESS_TOKEN)) {
                    console.log(data.state);
                    UserInfo.setName('홍길동');
                    UserInfo.setEmail('heyform@example.com');
                    UserInfo.setToken('');
                    UserInfo.setId(-1);
                    localStorage.clear();
                    navigate('/main');
                } else {
                    navigate('/mypage');
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
        }, 1000);
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