import {Card, Dropdown, DropdownButton, ListGroup, Button, Row, Col, Container, Form, Accordion,Image, Modal} from 'react-bootstrap'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CalendarComponent from '../components/Calender';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';



function Workspace() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

  	const [fullscreen, setFullscreen] = useState(true);

	  const [show2, setShow2] = useState(false);
	function handleShow2(breakpoint) {
		setFullscreen(breakpoint);
		setShow2(true);
	}
	// const middle =styled.div`
	// 	// display: flex;
	// 	// align-items: center;
	// 	// justify-content: center;
	// 	// `;
	//let navigate = useNavigate();
	// useEffect(()=> {
	// 	handleShow();
	// })
	return (
		<>
			<Row>
				<Row style={{marginBottom: "2%", marginTop: "2%"}}>
					<DropdownButton id="dropdown-basic-button" title="제작한 설문지">
						<Dropdown.Item href="#/action-1">진행 설문1</Dropdown.Item>
						<Dropdown.Item href="#/action-2">진행 설문2</Dropdown.Item>
						<Dropdown.Item href="#/action-3">종료 설문1</Dropdown.Item>
						<Dropdown.Item href="#/action-4">종료 설문2</Dropdown.Item>
					</DropdownButton>
				</Row>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Row>
						<Col md="7">
							<Row>
								<Col>
									<CalendarComponent />
								</Col>
							</Row>
						</Col>

					</Row>
				</div>
				<middle>
			
				<Row style={{marginBottom: "2%", marginTop: "2%"}}>
				<Col md="1">
						<Button variant="primary">결과 보기</Button>
					</Col>
					<Col md="2">

						<Button variant="primary" onClick={handleShow}>
							응답자 보기
						</Button>
						
						
					

						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>응답자</Modal.Title>
							</Modal.Header>
							<Modal.Body><Image src="list.png" style={{width: 100, alignItems: 'center',justifyContent: 'center'}}></Image></Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									닫기
								</Button>
								<Button variant="primary" onClick={handleClose}>
									문의하기
								</Button>
							</Modal.Footer>
						</Modal>
					</Col>
				
					
				</Row>
				
				</middle>
				

				<Row style={{paddingTop: 10}}>
					<Col>
						<ListGroup>
							<ListGroup>
								<Accordion>
									<Accordion.Item>
										<Accordion.Header><Image src="survey1.png" style={{width:30, padding:5}}></Image>진행중인 설문</Accordion.Header>
										<Accordion.Body>
											<ListGroup.Item>진행 설문1
												<Button variant="primary" onClick={handleShow2}>
												열기</Button>
												
												<Modal show={show2} fullscreen={fullscreen} onHide={() => setShow2(false)}>
        										<Modal.Header closeButton>
          										<Modal.Title>진행 설문1</Modal.Title>
												</Modal.Header>
												<Modal.Body>설문 내용<Image src="survey3.png" style={{width: "100%"}}></Image></Modal.Body>
											</Modal>				

											</ListGroup.Item>
											<ListGroup.Item>진행 설문2</ListGroup.Item>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>

								<Accordion>
									<Accordion.Item>
										<Accordion.Header><Image src="survey2.png" style={{width:30, padding:5}}></Image>기간이 종료된 설문</Accordion.Header>
										<Accordion.Body>
											<ListGroup.Item>종료 설문1</ListGroup.Item>
											<ListGroup.Item>종료 설문2</ListGroup.Item>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>								
							</ListGroup>
						</ListGroup>
					</Col>
					<Col>
						<div className='basicCard'>
							<Card style={{width: "auto", height: 700, textAlign: "center", paddingTop: 20}}>
								설문 내용
								<Image src="survey3.png" style={{width: "100%"}}></Image>
							</Card>
						
						</div>
						
					</Col>
				</Row>
			</Row>
		</>
	)
}

export {Workspace}