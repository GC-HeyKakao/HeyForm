import { Button, Row, Col } from 'react-bootstrap';
import { Footer } from '../components/Footer.js'
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { UserInfoContextStore } from '..//UserInfoContext';
import styled, { css } from "styled-components";

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

    let navigate = useNavigate();
    const UserInfo = useContext(UserInfoContextStore);

    // 토글 스위치를 활용한 알람 수신 여부 변경
    const [toggle, setToggle] = useState(false);
    const clickedToggle = () => {
        setToggle((prev) => !prev);
        !toggle ? UserInfo.setPush(true) : UserInfo.setPush(false);
    };


    // 로그아웃 버튼을 누를 때
    const handleLogoutButton = (e) => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            //확인을 누르면 실행
            navigate('/kakaologout');
            console.log("로그아웃 완료");
        }
        else {
            // isClick false로 초기화
            //alert("취소되었습니다.");
        }
    }

    useEffect(() => {

        console.log(UserInfo);

    }, [toggle]);

    return (
        <>
            <div className="wraper">
                <div className="content" style={{ padding: "100px", marginTop: "50px" }}>
                    <div className="center" style={{ width: "550px" }}>
                        <Row style={{ margin: "20px" }}>
                            <Col><h3>이름</h3></Col>
                            <Col><h3>{UserInfo.name}님</h3></Col>
                        </Row>
                        <Row style={{ margin: "20px" }}>
                            <Col><h3>이메일</h3></Col>
                            <Col><h3>{UserInfo.email}</h3></Col>
                        </Row>
                        <Row style={{ margin: "20px" }}>
                            <Col><h3>알림 수신 여부</h3></Col>
                            <Col>
                                <ToggleBtn onClick={clickedToggle} toggle={toggle}>
                                    <Circle toggle={toggle} />
                                </ToggleBtn>
                            </Col>
                        </Row>
                        <Button className="center" style={{ margin: "30px" }} onClick={handleLogoutButton}>로그아웃</Button>
                    </div>
                </div>>
                <Footer />
            </div>
        </>
    )
}

export { MyPage }