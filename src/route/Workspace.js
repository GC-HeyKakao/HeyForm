import {Card, Dropdown, DropdownButton, ListGroup, Button, Row, Col, Container, Form, Accordion} from 'react-bootstrap'

function Workspace() {
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

				<Row>
					<Col md="7">
						<Row>
							<Col>
								<Form.Control type="date" defaultValue={"2022-09-21"}></Form.Control>
							</Col>
							<Col>
								<Form.Control type="date" defaultValue={"2022-09-22"}></Form.Control>
							</Col>
						</Row>
					</Col>
					<Col md="1">
						<Button variant="primary">결과 보기</Button>
					</Col>
					<Col md="1">
						<Button variant="primary">응답자 보기</Button>
					</Col>
				</Row>

				<Row style={{paddingTop: 10}}>
					<Col>
						<ListGroup>
							<ListGroup>
								<Accordion>
									<Accordion.Item>
										<Accordion.Header>진행중인 설문</Accordion.Header>
										<Accordion.Body>
											<ListGroup.Item>진행 설문1</ListGroup.Item>
											<ListGroup.Item>진행 설문2</ListGroup.Item>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>

								<Accordion>
									<Accordion.Item>
										<Accordion.Header>기간이 종료된 설문</Accordion.Header>
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
							</Card>
						</div>
					</Col>
				</Row>
			</Row>
		</>
	)
}

export {Workspace}