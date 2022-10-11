import { useState, useEffect} from 'react';
import {Card, Nav, InputGroup, Form, FloatingLabel, Button, Row, Col, CloseButton, Dropdown, DropdownButton, SplitButton, ButtonGroup} from 'react-bootstrap';
import {DropdownCmpt} from '../components/Guide/DropdownCmpt.js'
import { WriteSurvey } from '../components/survey/WriteSurvey.js';
import {ResultSurvey} from '../components/survey/ResultSurvey.js'

function CreateSurvey() {
	let category_list = ['음식', '아동', '환경'];
	let [selectedCategory, setSelectedCategory] = useState('Category')
	let [savedQsList, setSavedQsList] = useState([]);
	let [curQs, setCurQs] = useState('');
	let [curQsItemList, setCurQsItemList] = useState([]);
	let [curSelectedType, setCurSelectedType] = useState('Type');
	let [makeQsSwitch, setMakeQsSwitch] = useState(false);
	let [surveyTitle, setSurveyTitle] = useState('');

	let [viewSwitch, setViewSwitch] = useState('create');

	useEffect(()=>{
		setCurQs('');
		setCurQsItemList([]);
	}, [curSelectedType, makeQsSwitch])

  return(
		<>
			<Row>
				<Nav variant="pills" defaultActiveKey="create" className='basicCard' style={{paddingTop: 5}} onSelect={(e)=>setViewSwitch(e)}>
					<Nav.Item>
						<Nav.Link eventKey="create">제작</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="share">공유</Nav.Link>
					</Nav.Item>
				</Nav>
			</Row>

			{
				viewSwitch=='create'?
				<Row style={{paddingTop: 10}}>
					<Col style={{width:'50%'}}>
						<Card className='basicCard'>
							<Card>
								<DropdownCmpt list={category_list} title={selectedCategory} style={{marginBottom: "1%"}} setSelected={setSelectedCategory} defaultTitle="Category"/>
								<FloatingLabel
									controlId="floatingTextarea"
									label="설문 제목을 입력해주세요"
									className="mb-3"
									style={{paddingLeft:"1%", paddingRight:"1%"}}
								>
									<Form.Control as="textarea" placeholder="설문지 제목을 입력해주세요." onChange={(e)=>{
										setSurveyTitle(e.target.value);
									}}/>
								</FloatingLabel>

								<Button 
									variant="secondary" size="sm" 
									style={{position: "absolute", top: "90%", left: "46%", zIndex: 1, width:"auto"}}
									onClick={()=>{
										setMakeQsSwitch(true);
									}}> + 
								</Button>
							</Card>
							
							{/* 설문 작성 */}
							{
								makeQsSwitch?<WriteSurvey savedQsList={savedQsList} setSavedQsList={setSavedQsList} curQs={curQs} setCurQs={setCurQs} 
									curQsItemList={curQsItemList} setCurQsItemList = {setCurQsItemList}
									curSelectedType={curSelectedType} setCurSelectedType={setCurSelectedType} setMakeQsSwitch={setMakeQsSwitch}/>
								:null
							}

							{/* 문항 리스트 */}
							{
								savedQsList.map((savedQs, idx)=>
								{
									return(
											{
												'주관식': 
													<Card className='basicCard' key={idx} > 
														<CloseButton onClick={()=>{
															let copy = [...savedQsList];
															copy.splice(idx, 1);
															setSavedQsList(copy);
						
															copy = [...curQsItemList];
															copy.splice(idx, 1);
															setCurQsItemList(copy);
														}}/>
														<Card.Title className='basicCard' > Q{idx+1}: {savedQs['qs']} </Card.Title>
													</Card>,
												'객관식': 
													<Card className='basicCard' key={idx} > 
														<CloseButton onClick={()=>{
															let copy = [...savedQsList];
															copy.splice(idx, 1);
															setSavedQsList(copy);
						
															copy = [...curQsItemList];
															copy.splice(idx, 1);
															setCurQsItemList(copy);
														}}/>
														<Card.Title> Q{idx+1}: {savedQs['qs']} </Card.Title>
														<Card.Body>
															{
																savedQs['qsItemList'].map(
																	(qsItem, idx)=><Card key={idx}>{idx+1}. {qsItem}</Card>
																)
															}
														</Card.Body>
													</Card>
											}[savedQs['type']]
									)
								})
							}

							<InputGroup style={{marginTop: "2%"}}>
								<InputGroup.Checkbox aria-label="Checkbox for following text input" />
								<InputGroup.Text>익명 체크</InputGroup.Text>
							</InputGroup>
						</Card>
					</Col>

					<Col style={{marginRight: "1%"}}>
						<ResultSurvey savedQsList={savedQsList} curQs={curQs} curQsItemList={curQsItemList} 
							curSelectedType={curSelectedType} setCurQs={setCurQs} setCurQsItemList={setCurQsItemList}
							surveyTitle={surveyTitle}/>
					</Col>
				</Row>

				:
				// 공유 탭
				<>
						<Row>
							<Col md={"1"}/>
							<Col md={"2"}>
									<Form.Label>시작 시간 설정</Form.Label>
									<Form.Control type="date" value="2022-09-21"/>
									<Form.Control type="time" value="08:30"/>
							</Col>
							<Col md={"2"}>
									<Form.Label>마감 시간 설정</Form.Label>
									<Form.Control type="date" value="2022-10-01"/>
									<Form.Control type="time" value="10:30"/>
							</Col>
							<Col md={"2"} style={{paddingTop: 70}}>
								<Dropdown>
									<Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
										알림 방식 설정
									</Dropdown.Toggle>

									<Dropdown.Menu variant="dark">
										<Dropdown.Item href="#/action-1" active>
											알림 방식 설정
										</Dropdown.Item>
										<Dropdown.Item href="#/action-2">카카오톡 알림</Dropdown.Item>
										<Dropdown.Item href="#/action-3">메일 알림</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item href="#/action-4">알리지 않음</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Col>
							<Col md="5"/>
						</Row>
						
						<Row style={{paddingTop: 50}}>
							<Col md="1">
								<Card style={{padding: '5%', textAlign: "center"}}>공유 Link 생성</Card>
							</Col>
							<Col md="1">
								<Card style={{padding: '5%', textAlign: "center"}}>공유 QR 생성</Card>
							</Col>
						</Row>
						<Button variant="primary" style={{display: "inline-block", marginLeft: 2, marginTop: 40}}>설문 제작 완료</Button>
				</>
			}
 		</>
	)
}

export {CreateSurvey};