import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Modal, Nav, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { KAKAO_AUTH_URL } from '..//OAuth';
import { GetRecommendCategory } from '../API/AI/GetRecommendCategory.js';
import { PostSurvey } from '../API/Survey/PostSurvey';
import { DateRangeSelector } from '../components/Survey/DateRangeSelector.js';
import { userState } from '../atom';
import { DropdownCmpt } from '../components/DropdownCmpt.js';
import { Preview } from '../components/Survey/Preview.js';
import { WriteSurvey } from '../components/Survey/WriteSurvey.js';

// @css
import './CreateSurvey.css';
// @mui
// import { styled } from '@mui/material/styles';

// const Main = styled('div')(({ theme }) => ({
// 	paddingLeft: theme.spacing(2),
// 	paddingRight: theme.spacing(2),
// 	paddingBottom: theme.spacing(3),
//    // paddingRight: theme.spacing(3),
//    [theme.breakpoints.up('lg')]: {
//       paddingLeft: theme.spacing(6),
//       paddingRight: theme.spacing(6),
//    },
// }));

const Main = styled.div`
  paddingLeft: 10px;
  paddingRight: 10px;
  paddingBottom: 10px;
`

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0.0.0.0);
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: rgba(0.0.0.0);
  }
  display: none;
`;

const ItemBlock = styled.div`

  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
	background-color: #535353;
    ${Remove} {
      display: initial;
    }
  }
`;

const Text = styled.div`
  flex: 1;
  font-size: 18px;
  color: white;
  margin-bottom: 1%;
  margin-left: 15px;
  ${(props) =>
		props.done &&
		css`
      color: #ced4da;
    `}
`;

function CreateSurvey() {

	const childRef = useRef();
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}, []));

	let category_list = ['기본', '운동', '환경','동물', '정치', '학교', '음악', '영화', '예술', '식사', '게임'];
	let [savedQsList, setSavedQsList] = useState([]);
	let [curQs, setCurQs] = useState('');
	let [curQsItemList, setCurQsItemList] = useState([]);
	let [curSelectedType, setCurSelectedType] = useState('Type');
	let [makeQsSwitch, setMakeQsSwitch] = useState(false);
	let [qsType, setQsType] = useState('');
	let [survey, setSurvey] = useState([]);
	let [viewSwitch, setViewSwitch] = useState('create');
	const [shareWay, setShareWay] = useState('null');
	let count = window.localStorage.getItem("count");

	//post에 사용
	let [surveyTitle, setSurveyTitle] = useState(null);
	let [surveyDescription, setSurveyDescription] = useState(null);
	let [surveyId, setSurveyId] = useState(0);
	let surveyState = useRef(-1);
	let [selectedCategory, setSelectedCategory] = useState('카테고리')
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

	// const link = useRecoilValue(linkState);
	const [link, setLink] = useState("");

	const myRef = useRef({});
	const users = useRecoilValue(userState);

	// //질문 등록 버튼
	// const [plusButton, setPlusButton] = useState("+");

	// const setPlusBtn = () => {
	// 	if (plusButton === "+") {
	// 		setPlusButton("질문 등록");
	// 	}
	// 	else if (plusButton === "질문 등록") {
	// 		myRef.current.createQuestion();
	// 		setPlusButton("+");
	// 	}
	// }

	useEffect(() => {
		if (!users.login) {
			window.location.href = KAKAO_AUTH_URL;
		}
	}, [])

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

		// const link_checked = linkCheckbox.checked;
		const link_checked = true;
		const qr_checked = qrCheckBox.checked;

		if (qr_checked == true) {
			setShareWay("QR");
		} else {
			setShareWay("writer");
		}
		// else {
		// 	setShareWay("null");
		// }
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
	const [isRecommended, setIsRecommended] = useState(false);
	const [cate, setCate] = useState("");

	function category() {
		setIsRecommended(true);
		
		// AI모듈
		GetRecommendCategory(surveyTitle, category_list, setRecommendCategory)
			.then((res) => {
				
				console.log("cate res", res);
				setRecommendCategory(res);
				console.log('RecommendCategory: ', RecommendCategory);
				// setRecommendCategory("기본");
				// setRecommendMent('와 관련된 디자인을 추천할게요!');
				if (RecommendCategory !== '') {
					setSelectedCategory(RecommendCategory);
					setRecommendMent('와 관련된 디자인을 추천할게요!');
				}
				else {
					setSelectedCategory("기본");
					// setRecommendMent('과 관련된 디자인을 추천할게요!');
				}

				console.log('조건문', RecommendCategory == '');
				console.log('RecommendCategory', RecommendCategory);

			}, (err) => console.log(err))
	}

	useEffect(() => {
		if (RecommendCategory !== '' &&  RecommendCategory!=="기본") {

			//name의 마지막 음절의 유니코드(UTF-16) 
			const charCode = RecommendCategory.charCodeAt(RecommendCategory.length - 1);
    
			//유니코드의 한글 범위 내에서 해당 코드의 받침 확인
			const consonantCode = (charCode - 44032) % 28;
			
			if(consonantCode === 0){
				//0이면 받침 없음 -> 를
				setRecommendMent(RecommendCategory+'와 관련된 디자인을 추천할게요!');
			}
			else {
				setRecommendMent(RecommendCategory+'과 관련된 디자인을 추천할게요!');

			}
			
			setSelectedCategory(RecommendCategory);
		}
		// else {
		// 	setSelectedCategory("기본");

		// }
		
	}, [RecommendCategory])

	// 설문 저장하기 버튼을 누를 때
	function handleSurveySaveButton() {
		// setShow(true);
		setViewSwitch('공유');
	}

	// 설문 제작 완료 버튼을 누를때 (공유탭))
	function handleSurveyCreateButton() {

		surveyDto.survey_state = null;
		surveyDto.start_time = null;
		surveyDto.end_time = null;
		surveyDto.category = selectedCategory;
		surveyDto.description = surveyDescription;
		surveyDto.survey_title = surveyTitle;

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

		// console.log('현재', surveyState.current);

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
				// //객관식이면 객관식 질문 문항들을 함께 전송해야함
				if (questionDtos[i].question_type == '객관식') {
					console.log("객관식임");
					choiceDtos=[];

					for (let j = 0; j < savedQsList[i].qsItemList.length; j++) {
						console.log("확인", savedQsList[i].qsItemList[j]);
						choiceDtos[j] = {
							choice_order: j,
							choice_contents: savedQsList[i].qsItemList[j],
						}
						
						console.log("확인", choiceDtos[j]);
					}

					questionDtos[i] = {
						question_type: savedQsList[i].type,
						question_order: i,
						question_contents: savedQsList[i].qs,
						choiceDtos: choiceDtos,
					}

					console.log("확인", choiceDtos);

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
			<Nav justify variant="tabs" defaultActiveKey="create" onSelect={(e) => setViewSwitch(e)}>
				<Nav.Item className="center">
					<Nav.Link eventKey="create">설문지 작성</Nav.Link>
				</Nav.Item>
				<Nav.Item className="center">
					<Nav.Link eventKey="share">응답 기간 설정</Nav.Link>
				</Nav.Item>
			</Nav>

			{
				viewSwitch == 'create' ?
					<>
						<Row className='create-row'>
							<div className='left' style={{ background: 'primary', height: '100%', oveerflowY:'auto' }}>
								<div className='left-content'>
									<div style={{ backgroundColor: "#2c2c2c", padding: "2%", border: "white" }}>
										<DropdownCmpt list={category_list} title={selectedCategory} style={{ width:"90px", marginBottom: "1%", float: "left", padding:10}} setSelected={setSelectedCategory} defaultTitle="Category" />
										<div style={{ marginTop:'15px', color:"white", float:"left", marginRight:"4%", textAlign:"left" }}>
											{!(RecommendCategory === '' || RecommendCategory === null) && <h5 style={{ marginTop: "0px", marginLeft:"0%" }}>{RecommendMent}</h5>}
										</div>
									</div>

									<Form.Control className="title-area" size="lg" as="textarea" placeholder="설문지 제목을 입력해주세요"
										style={{backgroundColor: "#2c2c2c" }}
										onChange={(e) => {
											setSurveyTitle(e.target.value);
										}}>{surveyTitle}</Form.Control>

									<Form.Control className="des-area" size="sm" as="textarea" placeholder="설문에 대한 설명을 입력해주세요"
										style={{ backgroundColor: "#2c2c2c" }} onChange={(e) => {
											setSurveyDescription(e.target.value)
										}}>{surveyDescription}</Form.Control>

									<div className="content">
										<Button className='plus-button'>+</Button>
										<div className="dropdown-content">
												<a href="#" onClick={()=> {
													if(!isRecommended) {
														category();
													}
													console.log("단답식");
													setQsType("단답식");
													setMakeQsSwitch(true);
												}}>단답식</a>
												<a href="#" onClick={()=> {
													if(!isRecommended) {
														category();
													}
													console.log("객관식");
													setQsType("객관식");
													setMakeQsSwitch(true);
												}}>객관식</a>
												<a href="#" onClick={()=> {
													if(!isRecommended) {
														category();
													}
													console.log("별점");
													setQsType("별점");
													setMakeQsSwitch(true);
												}}>별점</a>
												<a href="#" onClick={()=> {
													if(!isRecommended) {
														category();
													}
													console.log("리커트");
													setQsType("리커트");
													setMakeQsSwitch(true);
												}}>리커트</a>
												<a href="#" onClick={()=> {
													if(!isRecommended) {
														category();
													}
													console.log("감정바");
													setQsType("감정바");
													setMakeQsSwitch(true);
												}}>감정바</a>
											</div>
									</div>

									{/* 설문 작성 */}
									{
										makeQsSwitch ?
										<WriteSurvey ref={myRef} type={qsType} category={selectedCategory} savedQsList={savedQsList} setSavedQsList={setSavedQsList} curQs={curQs} setCurQs={setCurQs}
											curQsItemList={curQsItemList} setCurQsItemList={setCurQsItemList}
											curSelectedType={curSelectedType} setCurSelectedType={setCurSelectedType} setMakeQsSwitch={setMakeQsSwitch} />
											: null
									}

									<div className='qs-list' style={{ width: "95%", margin: "auto", marginTop: "5%", marginBottom: "5%", position: 'relative' }}>
										{/* 문항 리스트 */}
										{
											savedQsList.map((savedQs, idx) => {
												return (

													<div key={idx} className="item-block" style={{ overflow: "auto" }}>
														<ItemBlock>
															<Text>Q{idx + 1}: {savedQs['qs']}</Text>
															<Remove onClick={() => {
																let copy = [...savedQsList];
																copy.splice(idx, 1);
																setSavedQsList(copy);

																copy = [...curQsItemList];
																copy.splice(idx, 1);
																setCurQsItemList(copy);
															}}>
																<MdDelete style={{width:'30px', height:'30px', marginRight:'20px'}}/>
															</Remove>
														</ItemBlock>
													</div>
													// <Card className='basicCard' key={idx} style={{ marginBottom: "1%", marginTop: "1%" }}>
													// <CloseButton onClick={() => {
													// 	let copy = [...savedQsList];
													// 	copy.splice(idx, 1);
													// 	setSavedQsList(copy);

													// 	copy = [...curQsItemList];
													// 	copy.splice(idx, 1);
													// 	setCurQsItemList(copy);
													// }} />
													// 	<Card.Title className='qustion-list-card' style={{ marginLeft: "3%", marginBottom: "2%" }} > Q{idx + 1}: {savedQs['qs']} </Card.Title>
													// </Card>
												)
											})
										}

									</div>
								</div>

								<InputGroup style={{ marginTop: "10%" }}>
									{/* <InputGroup.Checkbox aria-label="Checkbox for following text input" />
										<InputGroup.Text>익명 체크</InputGroup.Text> */}
									<div />
								</InputGroup>
							</div>

							<div className='right'>
								<Preview category={selectedCategory} savedQsList={savedQsList} curQs={curQs} curQsItemList={curQsItemList}
									curSelectedType={curSelectedType} setCurQs={setCurQs} setCurQsItemList={setCurQsItemList}
									surveyTitle={surveyTitle} surveyDescription={surveyDescription} />

							</div>
						</Row>

						{/* 설문 저장하기 버튼 클릭시 나오는 화면 */}
						<Modal show={show} onHide={() => { setShow(false); }}  >
							<Modal.Body style={{ textAlign: "center" }}>
								<br />
								<h3>설문이 저장되었습니다!<br /></h3>
								<h4>지금 바로 설문을 공유할 수 있습니다🥰</h4>
							</Modal.Body>
							{/* 설문 josn post하기 */}
							<Modal.Footer>
								<Button variant='secondary' onClick={() => { setShow(false) }}>확인</Button>
							</Modal.Footer>
						</Modal>
					</>

					:
					// 공유 탭

					<>
						<div className="config-area" style={{ width: "100%", minHeight:'120vh', backgroundColor: "#F8F8FD", display: "flex", justifyContent: "center" }}>

							<div style={{ margin: "auto", marginTop: "50px", marginBottom: "10px" }}>
								<h6 style={{ fontWeight: "bold" }}>날짜를 드래그하거나 클릭하세요! 😉</h6>
								<div className="text-center p-4" >
									<DateRangeSelector startDateHandler={setStartDate} endDateHandler={setEndDate} startTimeHandler={setStartTime} endTimeHandler={setEndTime}/>
									{/* <div style={{ marginTop: '10px' }}>
										<input className="form-check-input" id="qrCheckBox" name="shareWay" type="checkbox" value="" onChange={(e) => {
											checkOnlyOne(e.target)
											is_checked()
										}} /> QR코드 생성하기
									</div> */}
									<div>
									<Button variant="secondary" className="center"
										style={{ marginTop: '10px' }}
										onClick={() => {
											handleSurveyCreateButton()
										}}>설문 제작 완료</Button></div>
								</div>
							</div>
						</div>

						{/* 설문 제작 완료 버튼 클릭시 나오는 화면 */}
						<Modal show={showCreate} onHide={() => { setShowCreate(false); }}  >
							<Modal.Body style={{ textAlign: "center" }}>
								<br />
								<h3>설문이 생성되었습니다!<br /></h3>
								<h4>완성된 설문을 확인하시겠습니까?🥰</h4>
								{/* 설문 josn post하기 */}
							</Modal.Body>
							<Modal.Footer>
								<Button variant='secondary' onClick={() => { navigate("/survey/" + link, { state: shareWay }); }}>확인</Button>
								<Button variant="light" onClick={() => { setShowCreate(false) }}>취소</Button>
							</Modal.Footer>
						</Modal>

						<Helmet>
							<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
						</Helmet>
					</>
			}
			<PostSurvey ref={childRef} setLink={setLink} surveyJson={surveyJson} />
		</>
	)
}

export { CreateSurvey };

