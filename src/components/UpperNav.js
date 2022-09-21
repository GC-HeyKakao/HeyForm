import {useNavigate} from 'react-router-dom'

import {Card, Nav, Navbar, Container, Image, Row, Col} from 'react-bootstrap';


function UpperNav() {
	let navigate = useNavigate();

  return(
		<Navbar bg="primary" variant="dark">
			<Row>
				<Col md={"2"} style={{paddingLeft: 10}}>
					<Navbar.Brand onClick={()=>navigate("/main")} ><img src="main_logo.png" width="60%" style={{paddingLeft: "2%"}}/>{' '}</Navbar.Brand>
				</Col>
				<Col md={"6"}>
					<Nav className="me-auto">
						<Nav.Link onClick={()=>navigate("/create")}>설문 만들기</Nav.Link>
						<Nav.Link onClick={()=>navigate("/workspace")}>워크 스페이스</Nav.Link>
						<Nav.Link onClick={()=>navigate("/guide")}>이용 가이드</Nav.Link>
					</Nav>
				</Col>
				<Col md={"4"}>
					<Nav>
						<Nav.Link onClick={()=>navigate("/login")} style={{marginLeft:400}}>로그인</Nav.Link>
					</Nav>
				</Col>
			</Row>
		</Navbar>
  )
}

export {UpperNav};