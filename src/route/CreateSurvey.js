import { useState, useEffect } from 'react';
import { Modal, Card, Nav, InputGroup, Form, FloatingLabel, Button, Row, Col, CloseButton } from 'react-bootstrap';
import { DropdownCmpt } from '../components/DropdownCmpt.js'
import { WriteSurvey } from '../components/Survey/WriteSurvey.js';
import { Preview } from '../components/Survey/Preview.js'
import { Helmet } from 'react-helmet'
import { KakaoShareButton } from '../components/Survey/KakaoShareButton'
import { useNavigate } from 'react-router-dom';

function CreateSurvey() {

	let category_list = ['만족도', '운동', '환경'];
	let [selectedCategory, setSelectedCategory] = useState('Category')
	let [savedQsList, setSavedQsList] = useState([]);
	let [curQs, setCurQs] = useState('');
	let [curQsItemList, setCurQsItemList] = useState([]);
	let [curSelectedType, setCurSelectedType] = useState('Type');
	let [makeQsSwitch, setMakeQsSwitch] = useState(false);
	let [surveyTitle, setSurveyTitle] = useState('');

	let [viewSwitch, setViewSwitch] = useState('create');
	let [shareWay, setShareWay] = useState('shareWay');


	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	let navigate = useNavigate();


	useEffect(() => {
		setCurQs('');
		setCurQsItemList([]);
	}, [curSelectedType, makeQsSwitch])

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

		if(link_checked == true)
		{
			setShareWay("Link");
		}
		else if(qr_checked == true)
		{
			setShareWay("QR");
		}
	}

	//공유 시간 및 날짜
	//렌더링되는 시점의 날짜 및 시간 가져오기
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var nextMonth = ('0' + (today.getMonth() + 2)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var hours = ('0' + today.getHours()).slice(-2);
	var minutes = ('0' + today.getMinutes()).slice(-2);

	var dateString = year + '-' + month + '-' + day;
	var timeString = hours + ':' + minutes;
	var nextDateString = year + '-' + nextMonth + '-' + day;


	// 설문 저장하기 버튼을 누를 때
	const handleButton = (e) => {
		setShow(true);
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
									<DropdownCmpt list={category_list} title={selectedCategory} style={{ marginBottom: "1%" }} setSelected={setSelectedCategory} defaultTitle="Category" />
									<FloatingLabel
										controlId="floatingTextarea"
										label="설문 제목을 입력해주세요"
										className="mb-3"
										style={{ paddingLeft: "1%", paddingRight: "1%" }}
									>
										<Form.Control as="textarea" placeholder="설문지 제목을 입력해주세요." onChange={(e) => {
											setSurveyTitle(e.target.value);
										}} />
									</FloatingLabel>

									<Button
										variant="secondary" size="sm"
										style={{ position: "absolute", top: "90%", left: "46%", zIndex: 1, width: "auto" }}
										onClick={() => {
											setMakeQsSwitch(true);
										}}> +
									</Button>

									{/* 설문 작성 */}
									{
										makeQsSwitch ? <WriteSurvey category= {selectedCategory} savedQsList={savedQsList} setSavedQsList={setSavedQsList} curQs={curQs} setCurQs={setCurQs}
											curQsItemList={curQsItemList} setCurQsItemList={setCurQsItemList}
											curSelectedType={curSelectedType} setCurSelectedType={setCurSelectedType} setMakeQsSwitch={setMakeQsSwitch} />
											: null
									}

									{/* 문항 리스트 */}
									{
										savedQsList.map((savedQs, idx) => {
											return (
												{
													'주관식':
														<Card className='basicCard' key={idx} >
															<CloseButton onClick={() => {
																let copy = [...savedQsList];
																copy.splice(idx, 1);
																setSavedQsList(copy);

																copy = [...curQsItemList];
																copy.splice(idx, 1);
																setCurQsItemList(copy);
															}} />
															<Card.Title className='basicCard' > Q{idx + 1}: {savedQs['qs']} </Card.Title>
														</Card>,
													'객관식':
														<Card className='basicCard' key={idx} >
															<CloseButton onClick={() => {
																let copy = [...savedQsList];
																copy.splice(idx, 1);
																setSavedQsList(copy);

																copy = [...curQsItemList];
																copy.splice(idx, 1);
																setCurQsItemList(copy);
															}} />
															<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
															<Card.Body>
																{
																	savedQs['qsItemList'].map(
																		(qsItem, idx) => <Card key={idx}>{idx + 1}. {qsItem}</Card>
																	)
																}
															</Card.Body>
														</Card>,
													'별점':
														<Card className='basicCard' key={idx} >
															<CloseButton onClick={() => {
																let copy = [...savedQsList];
																copy.splice(idx, 1);
																setSavedQsList(copy);

																copy = [...curQsItemList];
																copy.splice(idx, 1);
																setCurQsItemList(copy);
															}} />
															<Card.Title className='basicCard' > Q{idx + 1}: {savedQs['qs']} </Card.Title>
														</Card>,
													'리커트':
														<Card className='basicCard' key={idx} >
															<CloseButton onClick={() => {
																let copy = [...savedQsList];
																copy.splice(idx, 1);
																setSavedQsList(copy);

																copy = [...curQsItemList];
																copy.splice(idx, 1);
																setCurQsItemList(copy);
															}} />
															<Card.Title className='basicCard' > Q{idx + 1}: {savedQs['qs']} </Card.Title>
														</Card>,
													'감정바':
														<Card className='basicCard' key={idx} >
															<CloseButton className="btn-center" onClick={() => {
																let copy = [...savedQsList];
																copy.splice(idx, 1);
																setSavedQsList(copy);

																copy = [...curQsItemList];
																copy.splice(idx, 1);
																setCurQsItemList(copy);
															}} />
															<Card.Title className='basicCard' > Q{idx + 1}: {savedQs['qs']} </Card.Title>
														</Card>,
												}[savedQs['type']]
											)
										})
									}

									<InputGroup style={{ marginTop: "2%" }}>
										<InputGroup.Checkbox aria-label="Checkbox for following text input" />
										<InputGroup.Text>익명 체크</InputGroup.Text>
									</InputGroup>
								</Card>
							</Col>

							<Col style={{ marginRight: "1%" }}>
								<Preview category= {selectedCategory} savedQsList={savedQsList} curQs={curQs} curQsItemList={curQsItemList}
									curSelectedType={curSelectedType} setCurQs={setCurQs} setCurQsItemList={setCurQsItemList}
									surveyTitle={surveyTitle} />
							</Col>
						</Row>
						<Row>
							<Col >
								<div className="center-wrapper-120">
									<Button variant="primary" className="center" style={{ marginTop: 30 }} onClick={handleButton}>설문 저장하기</Button>
								</div>
							</Col>
						</Row>

						{/* 설문 저장하기 버튼 클릭시 나오는 화면 */}
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>설문 저장 완료</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ textAlign: "center" }}>
								<h2>설문이 저장되었습니다!<br /></h2>
								<h4>지금 바로 설문을 공유할 수 있습니다🥰</h4>
							</Modal.Body>
						</Modal>

					</>

					:
					// 공유 탭

					<>
						<div style={{textAlign:"center", paddingTop:"1%", paddingLeft:"10%", paddingRight:"10%"}}>
							<Row>
								<Col>
									<Form.Label style={{paddingBottom:"1%"}}><h3>시작 시간 설정</h3></Form.Label>
									<Form.Control style={{marginBottom:"1%"}} type="date" defaultValue={dateString}/>
									<Form.Control style={{marginBottom:"1%"}} type="time" defaultValue={timeString} />
								</Col>
								<Col>
									<Form.Label style={{paddingBottom:"1%"}}><h3>마감 시간 설정</h3></Form.Label>
									<Form.Control style={{marginBottom:"1%"}} type="date" defaultValue={nextDateString} />
									<Form.Control style={{marginBottom:"1%"}} type="time" defaultValue={timeString} />
								</Col>
							</Row>
							<Row style={{textAlign:"center", paddingTop:"5%"}}>
								<Col>
									<Card style={{ padding: '5%', textAlign: "center" }}>
										<div className='checkbox'>
											<input className="form-check-input" id="linkCheckBox" name="shareWay" type="checkbox" value=""onChange={(e) => {checkOnlyOne(e.target)
										is_checked()}}/> 링크로 생성하기 
										</div>
									</Card>
								</Col>
								<Col>
									<Card style={{ padding: '5%', textAlign: "center" }}>
										<div className='checkbox'>
											<input className="form-check-input" id="qrCheckBox" name="shareWay" type="checkbox" value="" onChange={(e) => {checkOnlyOne(e.target)
											is_checked()}}/> QR로 생성하기
										</div>
									</Card>

								</Col>
							</Row>

							<Row>
								<Col >
									<div className="center-wrapper-120">
										<Button variant="primary" className="center" 
												style={{ marginTop: 30 }} 
												onClick={()=> {
													// [제작] -> 설문 저장하기 버튼으로 옮기기.
													window.localStorage.setItem("savedQsList", JSON.stringify(savedQsList)); 
															   window.localStorage.setItem("curQs", JSON.stringify(curQs));
															   window.localStorage.setItem("curQsItemList", JSON.stringify(curQsItemList));
															   window.localStorage.setItem("curSelectedType", JSON.stringify(curSelectedType));
															   window.localStorage.setItem("surveyTitle", JSON.stringify(surveyTitle));
															   window.localStorage.setItem("category", selectedCategory);
															window.localStorage.setItem("shareWay", shareWay);
														navigate("/servey");}}>설문 제작 완료</Button>
														
									</div>
								</Col>
							</Row>
						</div>

						<Helmet>
							<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
						</Helmet>
					</>


			}
		</>
	)
}

export { CreateSurvey };