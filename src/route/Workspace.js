import { Card, Dropdown, DropdownButton, ListGroup, Button, Row, Col, Modal, Form, Accordion } from 'react-bootstrap'
import { Result } from '../components/Survey/Result/Result';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Respondent } from '../components/Survey/Result/Respondent';
import { useNavigate } from 'react-router-dom';
import { SurveyView } from '../components/Workspace/SurveyView'
import { tokenState } from '../atom';
import { GetSurveyBySurveyId } from '../API/Survey/GetSurveyBySurveyId';
import { DeleteSurvey } from '../API/Survey/DeleteSurvey';
import { GetSurveyByUserAccount } from '../API/Survey/GetSurveyByUserAccount'
import { useRecoilValue } from 'recoil';

function Workspace() {

	const childRef = useRef();

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
	let [count, setCount] = useState(0);
	let navigate = useNavigate();
	var ingId = new Array();
	var endId = new Array();
	var AnswerIngId = new Array();
	var AnswerEndId = new Array();

	let surveyId = 0;

	//제작 및 응답한 설문지 기간 조회에 사용됨
	const [startDate, setStartDate] = useState(dateString);
	const [endDate, setEndDate] = useState(preDateString);
	const token = useRecoilValue(tokenState);

	const show = useRef(false);
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}, []));
	const [selectNum, setSelectNum] = useState(0);
	const [viewSwitch, setViewSwitch] = useState('제작');

	const handleDelete = () => {
		//childRef.current.deleteSurvey(); 
		show.current=false;
		forceUpdate();
	}

	let surveyAllString;
	let surveyAllDto;

	useEffect(() => {

		//url을 넘겨줘서 설문 dto 가져옴. 이거 파싱해서 설문지 생성할거임
		GetSurveyByUserAccount(token)
		  .then((res) => {
			surveyAllString = res;
			surveyAllDto=surveyAllString.split('survey_id=');
			
			//setCount = Object.entries(surveyAllDto.SurveyQuestionDto).length;
			setCount(surveyAllDto.length);
			console.log(surveyAllDto);
			console.log("count", surveyAllDto.length);

			for ( var i = 1; i<count; i++)
			{

				console.log(i+1);
				let title = surveyAllDto[i].split(',');
				console.log("title", title[0]);
				ingId.push(title[0]);
				

			}

			console.log("타이틀", ingId);

			// if (window.localStorage.getItem('count') != 0) {

			// 	for (var i = 1; i < count + 1; i++) {
		
			// 		if (window.localStorage.getItem('token') == window.localStorage.getItem('creater[' + i + "]")) {
			// 			ingId.push(i);
			// 		}
			// 		else {
			// 			continue;
			// 		}
			// 	}
			// }
			// dtoJson = JSON.stringify(dto);
			// //surveyTitle = dtoJson.surveyDto.survey_title;
			// setTitle(dto.surveyDto.survey_title);
			// setCategory(dto.surveyDto.category);
			// setSavedQsList(dto.questionDtos);
			// setDes(dto.surveyDto.description);
			// setId(dto.surveyDto.survey_id);
			// console.log(savedQsList);
			// console.log('dto:', dto);
			// console.log('dto title', dto.surveyDto.survey_title);
			// console.log('dto que', dto.questionDtos);
			// console.log('saved qs lig', savedQsList2);
		  }, (err) => console.log(err))
	
	  }, []);

	// useEffect(() => {
	// 	//GetSurveyBySurveyId();
	// 	setSelectNum(1);
	// }, [show.current]);

	return (
		<>

			{viewSwitch === "제작" && <div>
				<Row>
					<Row style={{ marginBottom: "2%", marginTop: "2%" }}>
						<DropdownButton id="dropdown-basic-button" title="제작한 설문지">
							<Dropdown.Item onClick={() => { setViewSwitch("응답"); forceUpdate(); }}>응답한 설문지</Dropdown.Item>
						</DropdownButton>
					</Row>

					<Row>
						<Col md="4" style={{margin:"1%"}}>
							<Row>
								<Col>
									<Form.Control type="date" defaultValue={preDateString}
										onChange={(e) => setStartDate(e.target.value)}></Form.Control>
								</Col>
								<Col>
									<Form.Control type="date" defaultValue={dateString}
										onChange={(e) => setEndDate(e.target.value)}></Form.Control>
								</Col>
							</Row>
						</Col>
						<Col md="4" style={{margin:"1%"}}>
							<Button variant="primary" style={{marginLeft:"1%", marginRight:"1%"}} onClick={() => { view.current = "설문지"; forceUpdate(); }}>설문지 보기</Button>
							<Button variant="primary" style={{marginLeft:"1%", marginRight:"1%"}} onClick={() => { view.current = "결과"; forceUpdate(); }}>결과 보기</Button>
							<Button variant="primary" style={{marginLeft:"1%", marginRight:"1%"}} onClick={() => { view.current = "응답자"; forceUpdate(); }}>응답자 보기</Button>
							<Button variant="primary" style={{marginLeft:"1%", marginRight:"1%"}} onClick={() => { view.current = "삭제"; show.current=true; forceUpdate();}}>삭제</Button>
							{/* <DeleteSurvey ref={childRef} surveyId={surveyId} /> */}
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
													ingId && ingId.map((idx) => <ListGroup.Item onClick={() => { setSelectNum(idx); }}><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>진행 설문{idx}</Button></ListGroup.Item>)
													// ingId.map((idx) => <ListGroup.Item><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>{idx}</Button></ListGroup.Item>)

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
						{view.current === "설문지" && selectNum !== 0 &&
							<Col>
								<div className='basicCard'>
									<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
										{/* <SurveyView surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} endDate={props.endDate} surveyId={selectNum} /> */}
										<SurveyView surveyTitle='제목' surveyDescription='설명' endDate='2022-10-27' surveyId={selectNum} />
									</Card>
								</div>
							</Col>}
						{view.current === "결과" && selectNum !== 0 &&
							<Col>
								<div className='basicCard'>
									<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
										<Result surveyId={selectNum} />
									</Card>
								</div>
							</Col>}

						{view.current === "응답자" && selectNum !== 0 &&
							<Col>
								<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
									<Respondent surveyId={selectNum} />
								</Card>
							</Col>}

						{view.current === "삭제" && selectNum !== 0 &&
						<>
							<Col>
								<div className='basicCard'>
									<Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
										<SurveyView surveyTitle={'제목'} surveyDescription={'설명'} endDate={'2022-10-27'} surveyId={selectNum} />
									</Card>
								</div>
							</Col>
							<Modal show={show.current} onHide={() => { show.current=false; }}>
								<Modal.Body style={{ textAlign: "center" }}>
									<br />
									<h2>설문을 삭제하시겠습니까?<br /></h2>
									<br />
									<Button style={{ marginRight: "20px" }} onClick={handleDelete}>확인</Button>
									<Button onClick={() => { show.current=false; forceUpdate(); }}>취소</Button>
								</Modal.Body>
							</Modal>
							</>
						}
					</Row>
				</Row>
			</div>}

			{viewSwitch === "응답" && <div>
				<Row>
					<Row style={{ marginBottom: "2%", marginTop: "2%" }}>
						<DropdownButton id="dropdown-basic-button" title="응답한 설문지">
							<Dropdown.Item onClick={() => { setViewSwitch("제작"); forceUpdate(); }}>제작한 설문지</Dropdown.Item>
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