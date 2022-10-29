import { useNavigate, useLocation } from 'react-router-dom'
import { Nav, Navbar, Row, Col } from 'react-bootstrap';
import { KAKAO_AUTH_URL } from '..//OAuth';
import { useEffect, useState } from 'react';
import { userState } from '../atom';
import { useRecoilValue } from 'recoil';
import "./UpperNav.css";

function UpperNav() {

	const navigate = useNavigate();
	const [login, setLogin] = useState("로그인"); // 로그인된 상태면 이름이 뜨게, 아니면 로그인이라고 뜨게
	const users = useRecoilValue(userState);

	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setLogin('안녕하세요. ' + users[0].name + '님 ☺️');
		}
		else {
			setLogin("로그인");
		}

	}, [localStorage.getItem('token')]);


	return (
		<Navbar bg="primary" variant="dark">
			<Row style={{ width: 1500 }}>
				<Col md={"2"} style={{ paddingLeft: 10 }}>
					<Navbar.Brand onClick={() => navigate("/main")} ><img src="logo.png" className="main-logo" width="60%" style={{ paddingLeft: "2%" }} />{' '}</Navbar.Brand>
				</Col>
				<Col md={"6"}>
					<Nav className="me-auto">
						{/* 로그인 해야 다른 화면으로 넘어가게 */}
						<Nav.Link style={{ marginLeft: "10px", marginTop:"10px" }} onClick={!localStorage.getItem('token') ? handleLogin :() => navigate("/create")}>설문 만들기</Nav.Link>
						<Nav.Link style={{ marginLeft: "10px", marginTop:"10px" }} onClick={!localStorage.getItem('token') ? handleLogin :() => navigate("/workspace")}>워크 스페이스</Nav.Link>
						<Nav.Link style={{ marginLeft: "10px", marginTop:"10px" }} onClick={() => navigate("/guide")}>이용 가이드</Nav.Link>
						
					</Nav>
				</Col>
				<Col md={"3"}>
					<Nav className="myIcon">
						 {/* 로그인 된 상태면 마이페이지로 이동, 아니면 로그인하러 이동 */}
						<Nav.Link style={{marginTop:"10px"}}onClick={!localStorage.getItem('token') ? handleLogin : () => navigate("/mypage")} >{login}</Nav.Link>
					</Nav>
				</Col>
			</Row>
		</Navbar>
	)
}

export { UpperNav };