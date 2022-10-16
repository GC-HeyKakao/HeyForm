import { Card, Dropdown, DropdownButton, ListGroup, Button, Row, Col, Container, Form, Accordion } from 'react-bootstrap'
import { Result } from '../components/Survey/Result/Result';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Respondent } from '../components/Survey/Result/Respondent';
import { TestSurvey } from '../components/Survey/TestSurvey';

function Workspace() {

	//공유 시간 및 날짜
	//렌더링되는 시점의 날짜 및 시간 가져오기
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var preMonth = ('0' + (today.getMonth())).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;
	var preDateString = year + '-' + preMonth + '-' + day;
	let view = useRef("설문지");

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}, []));

	useEffect(() => {console.log(view.current) });

	return (
		<>
			<Row>
				<Row style={{ marginBottom: "2%", marginTop: "2%" }}>
					<DropdownButton id="dropdown-basic-button" title="제작한 설문지">
						<Dropdown.Item href="#/action-1">응답한 설문지</Dropdown.Item>
					</DropdownButton>
				</Row>

				<Row>
					<Col md="4">
						<Row>
							<Col>
								<Form.Control type="date" defaultValue={preDateString}></Form.Control>
							</Col>
							<Col>
								<Form.Control type="date" defaultValue={dateString}></Form.Control>
							</Col>
						</Row>
					</Col>
					<Col md="1">
						<Button variant="primary" onClick={() => { view.current = "설문지"; forceUpdate(); }}>설문지 보기</Button>
					</Col>
					<Col md="1">
						<Button variant="primary" onClick={() => { view.current = "결과"; forceUpdate(); }}>결과 보기</Button>
					</Col>
					<Col md="1">
						<Button variant="primary" onClick={() => { view.current = "응답자"; forceUpdate(); }}>응답자 보기</Button>
					</Col>
				</Row>

				<Row style={{ paddingTop: 10 }}>
					<Col md="4">
						<ListGroup >
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
					{view.current === "설문지" &&
						<Col>
							<div className='basicCard'>
								<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
									<TestSurvey></TestSurvey>
								</Card>
							</div>
						</Col>}

					{view.current === "결과" &&
						<Col>
							<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
								<Result />
							</Card>
						</Col>}

					{view.current === "응답자" &&
						<Col>
							<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
								<Respondent />
							</Card>
						</Col>}
				</Row>
			</Row>
		</>
	)
}

export { Workspace }