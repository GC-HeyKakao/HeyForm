import { Button, Row, Col, Modal } from 'react-bootstrap';
import { Footer } from '../components/Footer.js'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";
import { userState } from '../atom';
import { useRecoilValue } from 'recoil';
import './MyPage.css'

const ToggleBtn = styled.button`
  width: 120px;
  height: 50px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "none" : "#FFCC33")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div`
  background-color: white;
  width: 38px;
  height: 38px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
        props.toggle &&
        css`
      transform: translate(70px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

function MyPage() {

    const [show, setShow] = useState(false);
	const users = useRecoilValue(userState);

    let navigate = useNavigate();
    // const UserInfo = useContext(UserInfoContextStore);

    // 토글 스위치를 활용한 알람 수신 여부 변경
    const [toggle, setToggle] = useState(false);
    const clickedToggle = () => {
        setToggle((prev) => !prev);
        !toggle ? localStorage.setItem('push', true) : localStorage.setItem('push', false);
    };


    // 로그아웃 버튼을 누를 때
    const handleLogoutButton = (e) => {
        setShow(true);
    }

    useEffect(() => {
        console.log(localStorage.getItem('push'));
        // console.log(UserInfo);
    }, [toggle]);

    return (
        <>
            <div className="wraper">
                <div className="content" style={{ paddingTop: "100px", marginTop: "50px" }}>
                    <div className="center1">
                        <Row style={{marginBottom:"20px"}}>
                            <Col><h3>이름</h3></Col>
                            <Col><h3>{users[0].name}님</h3></Col>
                        </Row>
                        <Row style={{marginBottom:"20px"}}>
                            <Col><h3>이메일</h3></Col>
                            <Col><h3>{users[0].email}</h3></Col>
                        </Row>
                        <Row style={{marginBottom:"20px"}}>
                            <Col><h3>알림 수신 여부</h3></Col>
                            <Col>
                                <ToggleBtn onClick={clickedToggle} toggle={toggle}>
                                    <Circle toggle={toggle} />
                                </ToggleBtn>
                            </Col>
                        </Row>
                        <Col className='center2'>
                        <Button className="logoutBtn" onClick={handleLogoutButton}>로그아웃</Button>
                        </Col>
                    </div>
                </div>
                <Footer />
            </div>


            <Modal show={show} onHide={()=>{setShow(false)}}>
                <Modal.Body style={{ textAlign: "center" }}>
                    <br/>
                    <h2>로그아웃 하시겠습니까?<br/></h2>
                    <br/>
                    <Button style={{marginRight:"20px"}}onClick={()=>{navigate('/kakaologout')}}>확인</Button>
                    <Button onClick={()=>{setShow(false)}}>취소</Button>
                </Modal.Body>
            </Modal>

        </>
    )
}

export { MyPage }