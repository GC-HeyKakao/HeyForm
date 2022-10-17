import { Card, Dropdown, DropdownButton, ListGroup, Button, Row, Col, Container, Form, Accordion } from 'react-bootstrap'
import { Result } from '../components/Survey/Result/Result';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Respondent } from '../components/Survey/Result/Respondent';
import { useNavigate } from 'react-router-dom';
import { SurveyView } from '../components/Workspace/SurveyView'
import { GetSurveyBySurveyId } from '../API/Survey/GetSurveyBySurveyId';

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
	let count = window.localStorage.getItem("count");
	let navigate = useNavigate();
	var ingId = new Array();
	var endId = new Array();
	var AnswerIngId = new Array();
	var AnswerEndId = new Array();

	if (window.localStorage.getItem('count') != 0) {

		for (var i = 1; i < count + 1; i++) {

			if (window.localStorage.getItem('token') == window.localStorage.getItem('creater[' + i + "]")) {
				ingId.push(i);
			}
			else {
				continue;
			}
		}
	}

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}, []));
	const [selectNum, setSelectNum] = useState(0);
	const [viewSwitch, setViewSwitch] = useState('제작');

	useEffect(() => { 
		GetSurveyBySurveyId();
	 });

	return (
		<>

			{viewSwitch === "제작" && <div>
				<Row>
					<Row style={{ marginBottom: "2%", marginTop: "2%" }}>
						<DropdownButton id="dropdown-basic-button" title="제작한 설문지">
							<Dropdown.Item onClick={()=>{setViewSwitch("응답"); forceUpdate();}}>응답한 설문지</Dropdown.Item>
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
												{
													ingId.map((idx) => <ListGroup.Item onClick={() => { setSelectNum(idx); }}><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>진행 설문{idx}</Button></ListGroup.Item>)
												}
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>

									<Accordion>
										<Accordion.Item>
											<Accordion.Header>기간이 종료된 설문</Accordion.Header>
											<Accordion.Body>
												{
													endId.map((idx) => <ListGroup.Item onClick={() => { setSelectNum(idx); }}><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>종료 설문{idx}</Button></ListGroup.Item>)
												}
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</ListGroup>
							</ListGroup>
						</Col>
						{view.current === "설문지" && selectNum === 0 &&
							<Col>
								<div className='basicCard'>
									<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
										<></>
									</Card>
								</div>
							</Col>}
						{view.current === "설문지" && selectNum !== 0 &&
							<Col>
								<div className='basicCard'>
									<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
										<SurveyView surveyId={selectNum} />
									</Card>
								</div>
							</Col>}

						{view.current === "결과" && selectNum !== 0 &&
							<Col>
								<div className='basicCard'>
									<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
										<Result />
									</Card>
								</div>
							</Col>}

						{view.current === "응답자" &&
							<Col>
								<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
									<Respondent />
								</Card>
							</Col>}
					</Row>
				</Row>
			</div>}

			{viewSwitch === "응답" && <div>
				<Row>
					<Row style={{ marginBottom: "2%", marginTop: "2%" }}>
						<DropdownButton id="dropdown-basic-button" title="응답한 설문지">
							<Dropdown.Item onClick={()=>{setViewSwitch("제작"); forceUpdate();}}>제작한 설문지</Dropdown.Item>
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
					</Row>

					<Row style={{ paddingTop: 10 }}>
						<Col md="4">
							<ListGroup >
								<ListGroup>
									<Accordion>
										<Accordion.Item>
											<Accordion.Header>진행중인 설문</Accordion.Header>
											<Accordion.Body>
												{
													AnswerIngId.map((idx) => <ListGroup.Item onClick={() => { setSelectNum(idx); }}><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>진행 설문{idx}</Button></ListGroup.Item>)
												}
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>

									<Accordion>
										<Accordion.Item>
											<Accordion.Header>기간이 종료된 설문</Accordion.Header>
											<Accordion.Body>
												{
													AnswerEndId.map((idx) => <ListGroup.Item onClick={() => { setSelectNum(idx); }}><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>종료 설문{idx}</Button></ListGroup.Item>)
												}
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</ListGroup>
							</ListGroup>
						</Col>
							<Col>
								<div className='basicCard'>
									<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
										<></>
									</Card>
								</div>
							</Col>
					</Row>
				</Row>
			</div>}
		</>
	)
}

export { Workspace }