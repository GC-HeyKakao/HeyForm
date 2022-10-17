import { useNavigate, useLocation } from 'react-router-dom'
import { Nav, Navbar, Row, Col } from 'react-bootstrap';
import { KAKAO_AUTH_URL, REDIRECT_URI, REST_API_KEY } from '..//OAuth';
import { useDispatch, useSelector } from 'react-redux'
import { changeToken } from "../store.js"
import { useEffect, useState, useContext } from 'react';
import { UserInfoContextStore } from '../UserInfoContext';

function UpperNav() {

	const navigate = useNavigate();
	const location = useLocation();
	const KAKAO_CODE = location.search.split('=')[1];
	const [login, setLogin] = useState("로그인"); // 로그인된 상태면 이름이 뜨게, 아니면 로그인이라고 뜨게
	//const UserInfo = useContext(UserInfoContextStore);

	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};

	useEffect(() => {
		if (localStorage.getItem('name')) {
			setLogin('안녕하세요. ' + localStorage.getItem('name') + '님 ☺️');
		}
		else  {
			setLogin("로그인");
		}

	}, [localStorage.getItem('name')]);

	return (
		<Navbar bg="primary" variant="dark">
			<Row style={{ width: 1500 }}>
				<Col md={"2"} style={{ paddingLeft: 10 }}>
					<Navbar.Brand onClick={() => navigate("/main")} ><img src="logo.png" className="main-logo" width="60%" style={{ paddingLeft: "2%" }} />{' '}</Navbar.Brand>
				</Col>
				<Col md={"7"}>
					<Nav className="me-auto" style={{ marginLeft: "400px", fontSize: "20px", fontWeight:"500" }}>
						{/* 로그인 해야 다른 화면으로 넘어가게 */}
						<Nav.Link style={{ marginLeft: "10px" }} onClick={localStorage.getItem('id') === null ? handleLogin :() => navigate("/create")}>설문 만들기</Nav.Link>
						<Nav.Link style={{ marginLeft: "10px" }} onClick={localStorage.getItem('id') === null ? handleLogin :() => navigate("/workspace")}>워크 스페이스</Nav.Link>
						<Nav.Link style={{ marginLeft: "10px" }} onClick={localStorage.getItem('id') === null ? handleLogin :() => navigate("/guide")}>이용 가이드</Nav.Link>
						{/* <Nav.Link style={{ marginLeft: "10px" }} onClick={() => navigate("/create")}>설문 만들기</Nav.Link>
						<Nav.Link style={{ marginLeft: "10px" }} onClick={() => navigate("/workspace")}>워크 스페이스</Nav.Link>
						<Nav.Link style={{ marginLeft: "10px" }} onClick={() => navigate("/guide")}>이용 가이드</Nav.Link> */}

					</Nav>
				</Col>
				<Col md={"3"}>
					<Nav>
						 {/* 로그인 된 상태면 마이페이지로 이동, 아니면 로그인하러 이동 */}
						<Nav.Link onClick={localStorage.getItem('id') === null ? handleLogin : () => navigate("/mypage")} style={{ marginLeft: "100px", fontSize: "20px", fontWeight:"700" }}>{login}</Nav.Link>
					</Nav>
				</Col>
			</Row>
		</Navbar>
	)
}

export { UpperNav };