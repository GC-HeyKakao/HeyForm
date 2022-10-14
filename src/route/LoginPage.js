import {useEffect, useState} from 'react'
import { Button, Row, Col, Container, Image, Modal} from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import { KAKAO_AUTH_URL, REDIRECT_URI, REST_API_KEY } from '..//OAuth';

function LoginPage() {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const location = useLocation();
	const navigate = useNavigate();
	const KAKAO_CODE = location.search.split('=')[1];
	let code;

	const getKakaoToken = () => {
		console.log(KAKAO_CODE);
		fetch(`https://kauth.kakao.com/oauth/token`, {
			method: 'POST',
			headers: { 'Content-Type' : 'sapplication/x-www-form-urlencoded' },
			body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,   
		})
		.then((res) => {
			console.log(res); // 토큰이 넘어올 것임
			const ACCESS_TOKEN = res.data.accessToken;
			
			localStorage.setItem("token", ACCESS_TOKEN);    //예시로 로컬에 저장함    
					
		});

	};

	useEffect(()=> {
		handleShow();
		if (location.search) {
			console.log(code);
			getKakaoToken();
		}
	})

	// useEffect( () => {
	// 	console.log(code);
	// 	getKakaoToken();
	// }, []);
	
	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};

	// useEffect(() => {
	// 	alert("goToLogin"); //최초 한 번만 실행
	// }, []);
	
	return(
		<>			
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton onClick={()=>navigate("/main")}>
				<Modal.Title href={KAKAO_AUTH_URL}>LogIn</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* <Image src="kakao_login.png" 
						   style={{width: 450}}></Image> */}
					<Button onClick={handleLogin}> 카카오 로그인 </Button>
					{/* <Button href={KAKAO_AUTH_URL}>카카오 로그인</Button> */}
					<Button onClick={()=>navigate("/kakaoLogin")}> 페이지 이동 </Button>
				</Modal.Body>
			</Modal>
		</>
	)

}

export {LoginPage}