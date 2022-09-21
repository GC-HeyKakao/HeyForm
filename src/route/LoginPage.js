import {useEffect, useState} from 'react'
import {Card, Form, Button, Row, Col, Container, Image, Modal} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
	let navigate = useNavigate();
	useEffect(()=> {
		handleShow();
	})

	return(
		<>			
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton onClick={()=>navigate("/main")}>
				<Modal.Title>LogIn</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Image src="kakao_login.png" style={{width: 450}}></Image>
				</Modal.Body>
			</Modal>
		</>
	)
}

export {LoginPage}