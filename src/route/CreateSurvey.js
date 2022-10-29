import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Modal, Card, Nav, InputGroup, Form, FloatingLabel, Button, Row, Col, CloseButton } from 'react-bootstrap';
import { DropdownCmpt } from '../components/DropdownCmpt.js'
import { WriteSurvey } from '../components/Survey/WriteSurvey.js';
import { Preview } from '../components/Survey/Preview.js'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import { PostSurvey } from '../API/Survey/PostSurvey';
import { UpdateSurvey } from '../API/Survey/UpdateSurvey.js';
import { SurveySheet } from '../components/Survey/SurveySheet.js';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { linkState, userState } from '../atom';
import { RecommendCate } from '../components/AI/RecommendCate.js';

function CreateSurvey() {

	const childRef = useRef();
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}, []));

	let category_list = ['만족도', '운동', '환경'];
	let [savedQsList, setSavedQsList] = useState([]);
	let [curQs, setCurQs] = useState('');
	let [curQsItemList, setCurQsItemList] = useState([]);
	let [curSelectedType, setCurSelectedType] = useState('Type');
	let [makeQsSwitch, setMakeQsSwitch] = useState(false);
	let [survey, setSurvey] = useState([]);
	let [viewSwitch, setViewSwitch] = useState('create');
	let [shareWay, setShareWay] = useState('shareWay');
	let count = window.localStorage.getItem("count");

	//post에 사용
	let [surveyTitle, setSurveyTitle] = useState(null);
	let [surveyDescription, setSurveyDescription] = useState(null);
	let [surveyId, setSurveyId] = useState(0);
	let surveyState = useRef(-1);
	let [selectedCategory, setSelectedCategory] = useState('Category')
	window.localStorage.setItem("count", 1);

	//저장시 모달 보여주기에서 사용
	const [show, setShow] = useState(false);
	const [showCreate, setShowCreate] = useState(false);

	let navigate = useNavigate();

	// handleSurveySaveButton, handleSurveyCreateButton에서 사용 즉, PostSurvey, UpdateSurvey API에서 사용함
	let surveyJson = new Object();
	let surveyDto = new Object();

	// surveyDto
	surveyDto.survey_state = null;
	surveyDto.end_time = '12:12:12 12:12:00';
	surveyDto.end_time = '12:12:12 12:12:00';
	surveyDto.category = null;
	surveyDto.description = null;
	surveyDto.survey_title = null;

	// surveyDto.survey_id = null;
	// surveyDto.survey_url = null;

	let questionDtos = new Array();
	let choiceDtos = new Array();
	let choiceDtos2 = new Array();

	const link = useRecoilValue(linkState);

	useEffect(() => {
		setCurQs('');
		setCurQsItemList([]);
	}, [curSelectedType, makeQsSwitch, showCreate])

	//체크박스 하나만 선택
	const checkOnlyOne = (checkThis) => {
		const checkboxes = document.getElementsByName('shareWay')
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i] !== checkThis) {
				checkboxes[i].checked = false
			}
		}
	}

	//체크박스 체크 여부 확인
	//체크여부에 따라서 setShareWay()
	function is_checked() {

		const linkCheckbox = document.getElementById('linkCheckBox');
		const qrCheckBox = document.getElementById('qrCheckBox');

		const link_checked = linkCheckbox.checked;
		const qr_checked = qrCheckBox.checked;

		if (link_checked == true) {
			setShareWay("Link");
		}
		else if (qr_checked == true) {
			setShareWay("QR");
		}
	}

	//공유 시간 및 날짜
	//렌더링되는 시점의 날짜 및 시간 가져오기
	let today = new Date();
	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	let nextMonth = ('0' + (today.getMonth() + 2)).slice(-2);
	let day = ('0' + today.getDate()).slice(-2);
	let hours = ('0' + today.getHours()).slice(-2);
	let minutes = ('0' + today.getMinutes()).slice(-2);
	let seconds = ('0' + today.getSeconds()).slice(-2);

	let dateString = year + '-' + month + '-' + day;
	let timeString = hours + ':' + minutes;
	let nextDateString = year + '-' + nextMonth + '-' + day;
	let current_time_temp = dateString + ' ' + timeString + ':' + seconds;

	// 설문 공유때 사용되는 시작 시간 및 종료 시간
	// start_time: 배포 시작 날짜 및 시간, 예시 "2022-12-11 12:00:00"
	let start_time_temp = dateString + ' ' + timeString + ':00';
	// 배포 마감 날짜 및 시간
	let end_time_temp = nextDateString + ' ' + timeString + ':00';

	const [startDate, setStartDate] = useState(dateString);
	const [startTime, setStartTime] = useState(timeString);
	const [endDate, setEndDate] = useState(nextDateString);
	const [endTime, setEndTime] = useState(timeString);

	const [RecommendCategory, setRecommendCategory] = useState('');
	const [RecommendMent, setRecommendMent] = useState('');

	function category() {
		// AI모듈
		RecommendCate(surveyTitle, category_list)
			.then((res) => {
				console.log('RecommendCategory: ', RecommendCategory);
				setRecommendCategory(res);
				setRecommendMent('와 관련된 디자인을 추천할게요!');
				setSelectedCategory(res);
				

			}, (err) => console.log(err))
	}

	// 설문 저장하기 버튼을 누를 때
	function handleSurveySaveButton() {

		window.localStorage.setItem("count", parseInt(window.localStorage.getItem("count")) + 1);
		window.localStorage.setItem("savedQsList[" + count + "]", JSON.stringify(savedQsList));
		window.localStorage.setItem("curQs[" + count + "]", JSON.stringify(curQs));
		window.localStorage.setItem("curQsItemList[" + count + "]", JSON.stringify(curQsItemList));
		window.localStorage.setItem("curSelectedType[" + count + "]", JSON.stringify(curSelectedType));
		window.localStorage.setItem("surveyTitle[" + count + "]", JSON.stringify(surveyTitle));
		window.localStorage.setItem("category[" + count + "]", selectedCategory);
		window.localStorage.setItem("creater[" + count + "]", window.localStorage.getItem("token"));

		setShow(true);
	}

	// 설문 제작 완료 버튼을 누를때 (공유탭))
	function handleSurveyCreateButton() {

		surveyDto.survey_state = null;
		surveyDto.start_time = null;
		surveyDto.end_time = null;
		surveyDto.category = selectedCategory;
		surveyDto.description = surveyDescription;
		surveyDto.survey_title = surveyTitle;
		// surveyDto.survey_id = count; // +++ 현재 로컬에 있는 값이라 수정해야함
		// surveyDto.survey_url = 'http://localhost:3000' + '/survey/' + count;
		//surveyDto.survey_url = 'http://210.109.63.151'+'/survey/'+count; //+++ 배포할 때 이걸로

		start_time_temp = startDate + ' ' + startTime + ':00'
		end_time_temp = endDate + ' ' + endTime + ':00';

		surveyDto.start_time = start_time_temp;
		console.log('surveydto의 시작시간', surveyDto.start_time);
		surveyDto.end_time = end_time_temp;

		// 아래의 세가지 변수는 설문 state 판별을 위한 조건문에 사용
		// 0: 진행중 1: 배포전 2: 종료
		let start_time = new Date(start_time_temp);
		let end_time = new Date(end_time_temp);
		let current_time = new Date(current_time_temp);

		console.log('현재', surveyState.current);

		if (start_time > end_time) {
			alert("설문 종료 시간은 설문 시작 시간 이전일 수 없습니다.");
		} else {
			if (start_time <= current_time && current_time <= end_time) {
				surveyState.current = 0;

			} else if (start_time > current_time) {
				// 배포 전
				surveyState.current = 1;
			} else if (end_time < current_time) {
				// 종료된 설문
				surveyState.current = 2;
			} else {
				alert("?")
			}
		}

		surveyDto.survey_state = surveyState.current;

		console.log('설문 저장 시작', surveyDto.survey_state);


		if (surveyState.current != -1) {

			for (let i = 0; i < savedQsList.length; i++) {
				questionDtos[i] = {
					question_type: savedQsList[i].type,
					question_order: i,
					question_contents: savedQsList[i].qs,
				}

				// //객관식이면 객관식 질문 문항들을 함께 전송해야함
				if (questionDtos[i].question_type == '객관식') {
					console.log("객관식임");
					for (let j = 0; j < savedQsList[i].qsItemList.length; j++) {
						choiceDtos[j] = {
							choice_order: j,
							choice_contents: savedQsList[i].qsItemList[j],
						}
					}

					questionDtos[i] = {
						question_type: savedQsList[i].type,
						question_order: i,
						question_contents: savedQsList[i].qs,
						choiceDtos: choiceDtos,
					}

				} else {

					choiceDtos2[0] = {
						choice_order: null,
						choice_contents: null,
					}

					questionDtos[i] = {
						question_type: savedQsList[i].type,
						question_order: i,
						question_contents: savedQsList[i].qs,
						choiceDtos: choiceDtos2,
					}
				}
			}

			// questionHandler(copy);

			surveyJson.surveyDto = surveyDto;
			surveyJson.questionDtos = questionDtos;
			surveyJson = JSON.stringify(surveyJson).replace(/ /gi, "");

			childRef.current.postSurvey();

			setShowCreate(true);
			forceUpdate();
		}
	}

	return (
		<>
			<Row>
				<Nav variant="pills" defaultActiveKey="create" className="center-wrapper-150" style={{ padding: 15 }} onSelect={(e) => setViewSwitch(e)}>
					<Nav.Item className="center">
						<Nav.Link eventKey="create">제작</Nav.Link>
					</Nav.Item>
					<Nav.Item className="center">
						<Nav.Link eventKey="share">공유</Nav.Link>
					</Nav.Item>
				</Nav>
			</Row>

			{
				viewSwitch == 'create' ?
					<>
						<Row style={{ paddingTop: 10 }}>
							<Col style={{ width: '50%' }}>
								<Card className='basicCard'>
									<div>
										<DropdownCmpt list={category_list} title={selectedCategory} style={{ marginBottom: "1%", float: "left" }} setSelected={setSelectedCategory} defaultTitle="Category" />
										<div style={{ marginTop: "2%", marginRight: "35%" }}>
											{RecommendCategory !== '' && <h5 style={{ float: "right" }}>{RecommendCategory}{RecommendMent}</h5>}
										</div>
									</div>
									<FloatingLabel
										controlId="floatingTextarea"
										label="설문 제목을 입력해주세요"
										className="mb-3"
										style={{ paddingLeft: "1%", paddingRight: "1%" }}
									>
										<Form.Control as="textarea" placeholder="설문지 제목을 입력해주세요" onChange={(e) => {
											setSurveyTitle(e.target.value);
										}} />
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingTextarea"
										label="설문에 대한 설명을 입력해주세요"
										className="mb-8"
										style={{ paddingLeft: "1%", paddingRight: "1%" }}
									>
										<Form.Control as="textarea" placeholder="설문에 대한 설명을 입력해주세요" style={{ height: "100px" }} onChange={(e) => {
											setSurveyDescription(e.target.value);
										}} />
									</FloatingLabel>

									<Button
										letiant="secondary" size="sm"
										style={{ position: "absolute", top: "90%", left: "46%", zIndex: 1, width: "auto" }}
										onClick={() => {
											setMakeQsSwitch(true);
											category();
										}}> +
									</Button>

									{/* 설문 작성 */}
									{
										makeQsSwitch ? <WriteSurvey category={selectedCategory} savedQsList={savedQsList} setSavedQsList={setSavedQsList} curQs={curQs} setCurQs={setCurQs}
											curQsItemList={curQsItemList} setCurQsItemList={setCurQsItemList}
											curSelectedType={curSelectedType} setCurSelectedType={setCurSelectedType} setMakeQsSwitch={setMakeQsSwitch} />
											: null
									}
									<div style={{ margin: "1%" }}>
										{/* 문항 리스트 */}
										{
											savedQsList.map((savedQs, idx) => {
												return (
													<Card className='basicCard' key={idx} style={{ marginBottom: "1%", marginTop: "1%" }}>
														<CloseButton onClick={() => {
															let copy = [...savedQsList];
															copy.splice(idx, 1);
															setSavedQsList(copy);

															copy = [...curQsItemList];
															copy.splice(idx, 1);
															setCurQsItemList(copy);
														}} />
														<Card.Title className='basicCard' style={{ marginLeft: "3%", marginBottom: "2%" }} > Q{idx + 1}: {savedQs['qs']} </Card.Title>
													</Card>
												)
											})
										}
									</div>

									<InputGroup style={{ marginTop: "10%" }}>
										{/* <InputGroup.Checkbox aria-label="Checkbox for following text input" />
										<InputGroup.Text>익명 체크</InputGroup.Text> */}
										<div />
									</InputGroup>
								</Card>
							</Col>

							<Col style={{ marginRight: "1%" }}>
								<Preview category={selectedCategory} savedQsList={savedQsList} curQs={curQs} curQsItemList={curQsItemList}
									curSelectedType={curSelectedType} setCurQs={setCurQs} setCurQsItemList={setCurQsItemList}
									surveyTitle={surveyTitle} surveyDescription={surveyDescription} />
							</Col>
						</Row>
						<Row>
							<Col >
								<div className="center-wrapper-120">
									<Button letiant="primary" className="center" style={{ marginTop: 30 }} onClick={handleSurveySaveButton}>설문 저장하기</Button>
								</div>
							</Col>
						</Row>

						{/* 설문 저장하기 버튼 클릭시 나오는 화면 */}
						<Modal show={show} onHide={() => { setShow(false); }}>
							<Modal.Body style={{ textAlign: "center" }}>
								<br />
								<h2>설문이 저장되었습니다!<br /></h2>
								<h4>지금 바로 설문을 공유할 수 있습니다🥰</h4>
								<br />
								{/* 설문 josn post하기 */}
								<Button onClick={() => { setShow(false) }}>확인</Button>
							</Modal.Body>
						</Modal>
					</>

					:
					// 공유 탭

					<>
						<div style={{ textAlign: "center", paddingTop: "1%", paddingLeft: "10%", paddingRight: "10%" }}>
							<Row>
								<Col>
									<Form.Label style={{ paddingBottom: "1%" }}><h3>시작 시간 설정</h3></Form.Label>
									<Form.Control style={{ marginBottom: "1%" }} type="date"
										onChange={(e) => setStartDate(e.target.value)} defaultValue={dateString} />
									<Form.Control style={{ marginBottom: "1%" }} type="time"
										onChange={(e) => setStartTime(e.target.value)} defaultValue={timeString} />
								</Col>
								<Col>
									<Form.Label style={{ paddingBottom: "1%" }}><h3>마감 시간 설정</h3></Form.Label>
									<Form.Control style={{ marginBottom: "1%" }} type="date" defaultValue={nextDateString}
										onChange={(e) => setEndDate(e.target.value)} />
									<Form.Control style={{ marginBottom: "1%" }} type="time"
										onChange={(e) => setEndTime(e.target.value)} defaultValue={timeString} />
								</Col>
							</Row>
							<Row style={{ textAlign: "center", paddingTop: "5%" }}>
								<Col>
									<Card style={{ padding: '5%', textAlign: "center" }}>
										<div className='checkbox'>
											<input className="form-check-input" id="linkCheckBox" name="shareWay" type="checkbox" value="" onChange={(e) => {
												checkOnlyOne(e.target)
												is_checked()
											}} /> 링크로 생성하기
										</div>
									</Card>
								</Col>
								<Col>
									<Card style={{ padding: '5%', textAlign: "center" }}>
										<div className='checkbox'>
											<input className="form-check-input" id="qrCheckBox" name="shareWay" type="checkbox" value="" onChange={(e) => {
												checkOnlyOne(e.target)
												is_checked()
											}} /> QR로 생성하기
										</div>
									</Card>

								</Col>
							</Row>

							<Row>
								<Col >
									<div className="center-wrapper-120">
										<Button letiant="primary" className="center"
											style={{ marginTop: 30 }}
											onClick={() => {

												handleSurveyCreateButton()
											}}>설문 제작 완료</Button>
										<div>
											{
												console.log(survey)
											}
										</div>
									</div>
								</Col>
							</Row>
						</div>
						{/* 설문 제작 완료 버튼 클릭시 나오는 화면 */}
						<Modal show={showCreate} onHide={() => { setShowCreate(false); }}>
							<Modal.Body style={{ textAlign: "center" }}>
								<br />
								<h2>설문이 생성되었습니다!<br /></h2>
								<h4>완성된 설문을 확인하시겠습니까?🥰</h4>
								<br />
								{/* 설문 josn post하기 */}
								<Button style={{ marginRight: "20px" }} onClick={() => { localStorage[link] = shareWay; navigate("/survey/" + link); }}>확인</Button>
								<Button onClick={() => { setShowCreate(false) }}>취소</Button>
							</Modal.Body>
						</Modal>

						<Helmet>
							<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
						</Helmet>
					</>


			}
			<PostSurvey ref={childRef} userToken={localStorage.getItem('token')} surveyJson={surveyJson} />
		</>
	)
}

export { CreateSurvey };