import { Dropdown, DropdownButton, ListGroup, Button, Row, Col, Modal, Badge, Accordion } from 'react-bootstrap'
import { Result } from '../components/Survey/Result/Result';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Respondent } from '../components/Survey/Result/Respondent';
import { SurveyView } from '../components/Workspace/SurveyView'
import { GetSurveyByToken } from '../API/Survey/GetSurveyByToken'
import { DeleteSurvey } from '../API/Survey/DeleteSurvey';
import { AnswerView } from '../components/Workspace/AnswerView'
import { GetUserAnswer } from '../API/Answer/GetUserAnswer';
import { userState } from '../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GetSurveyBySurveyId } from '../API/Survey/GetSurveyBySurveyId';
import { KAKAO_AUTH_URL } from '..//OAuth';

// @mui
import { styled } from '@mui/material/styles';
// css
import './Workspace.css';
import { GetAnswerResult } from '../API/Answer/GetAnswerResult';

const Main = styled('div')(({ theme }) => ({
   paddingLeft: theme.spacing(3),
   paddingBottom: theme.spacing(5),
   // paddingRight: theme.spacing(3),
   [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(2),
   },
}));

function Workspace() {

   const users = useRecoilValue(userState);
   const userHandler =
      useSetRecoilState(userState);
   const surveyRef = useRef(null);

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
   const [selectNum, setSelectNum] = useState(-1);
   const [answerSelectNum, setAnswerSelectNum] = useState(-1);

   //진행 중 설문
   const [ingUrl, setIngUrl] = useState([]);
   const [ingId, setIngId] = useState([]);
   const [ingTitle, setIngTitle] = useState([]);
   const [ingCount, setIngCount] = useState(0);

   //시작 전 설문
   const [beforeUrl, setBeforeUrl] = useState([]);
   const [beforeId, setBeforeId] = useState([]);
   const [beforeTitle, setBeforeTitle] = useState([]);
   const [beforeCount, setBeforeCount] = useState(0);

   //종료된 설문
   const [endUrl, setEndUrl] = useState([]);
   const [endId, setEndId] = useState([]);
   const [endTitle, setEndTitle] = useState([]);
   const [endCount, setEndCount] = useState(0);

   //응답
   const [ingAnswerId, setIngAnswerId] = useState([]);
   const [ingAnswerTitle, setIngAnswerTitle] = useState([]);
   const [ingAnswerUrl, setIngAnswerUrl] = useState([]);
   const [endAnswerId, setEndAnswerId] = useState([]);
   const [endAnswerTitle, setEndAnswerTitle] = useState([]);
   const [endAnswerUrl, setEndAnswerUrl] = useState([]);
   const [ingAnswerCount, setIngAnswerCount] = useState(-1);
   const [endAnswerCount, setEndAnswerCount] = useState(-1);
   const [surveyType, setSurveyType] = useState(0);
   const [userAnswerDtoState, setUserAnswerDto] = useState();
   const [ingAnswerDtoState, setIngAnswerDto] = useState([]);
   const [endAnswerDtoState, setEndAnswerDto] = useState([]);
   const [ingSurveyDtoState, setIngSurveyDto] = useState([]);
   let userAnswerDto;
   const [endSurveyDtoState, setEndSurveyDto] = useState([]);

   // //제작 및 응답한 설문지 기간 조회에 사용됨
   // const [startDate, setStartDate] = useState(dateString);
   // const [endDate, setEndDate] = useState(preDateString);

   //Modal
   const [show, setShow] = useState(false);
   const [showDeleteIng, setShowDeleteIng] = useState(false);
   const [, updateState] = useState();
   const forceUpdate = useCallback(() => updateState({}, []));
   const [viewSwitch, setViewSwitch] = useState('제작');

   const [surveyQuestionDtoState, setSurveyQuestionDto] = useState([]);
   let surveyQuestionDto = [];
   let surveyQuestionDtoTemp = [];

   function handleDeleteBtn() {
      view.current = "삭제";
      if (selectNum + 1 <= ingCount) {
         setShowDeleteIng(true);
      } else {
         setShow(true);
      }
   }

   //제작한 설문지 삭제 기능
   //설문 '삭제' 클릭 -> '설문을 삭제하시겠습니까?' 에서 '확인'을 클릭하면 실행
   function handleDelete() {
      setShow(false);
      view.current = '설문지';
      if (ingCount < selectNum + 1 && selectNum + 1 <= ingCount + beforeCount) {
         //시작 전
         DeleteSurvey(beforeId[selectNum - ingCount]);
         beforeUrl.splice(selectNum - ingCount, 1);
         setBeforeUrl(beforeUrl);
         beforeId.splice(selectNum - ingCount, 1)
         setBeforeId(beforeId);
         setBeforeCount(beforeCount - 1);
         beforeTitle.splice(selectNum - ingCount, 1);
         setBeforeTitle(beforeTitle);
         surveyQuestionDtoState.splice(selectNum, 1);
         setSurveyQuestionDto(surveyQuestionDtoState);
      } else if (ingCount + beforeCount < selectNum + 1) {
         //종료
         console.log('else if selectNum', selectNum);
         DeleteSurvey(endId[selectNum - ingCount - beforeCount]);
         endUrl.splice(selectNum - ingCount - beforeCount, 1);
         setEndUrl(endUrl);
         endId.splice(selectNum - ingCount - beforeCount, 1)
         setEndId(endId);
         setEndCount(endCount - 1);
         endTitle.splice(selectNum - ingCount - beforeCount, 1);
         setEndTitle(endTitle);
         surveyQuestionDtoState.splice(selectNum, 1);
         setSurveyQuestionDto(surveyQuestionDtoState);
      }

      if (selectNum === 0) {
         setSelectNum(selectNum + 1);
      } else {
         setSelectNum(0);
      }

      forceUpdate();
   }

   useEffect(() => {
      if (!users.login) {
         window.location.href = KAKAO_AUTH_URL;
      }
   }, [])

   useEffect(() => {
      //사용자 토큰으로 모든 survey정보를 가져와서 워크스페이스를 구성한다. 
      GetSurveyByToken(users, userHandler)
         .then((res) => {
            console.log('res: ', res);
            surveyQuestionDto = JSON.parse(JSON.stringify(res));
            surveyQuestionDtoTemp = new Array();
            console.log('surveyQuestionDto', surveyQuestionDto);

            if (res === null) {
               surveyQuestionDto = [];
            }

            for (let i = 0; i < surveyQuestionDto.length; i++) {
               if (surveyQuestionDto[i].surveyDto.survey_state === 0) {
                  //진행 중
                  ingUrl.push(surveyQuestionDto[i].surveyDto.survey_url);
                  ingId.push(surveyQuestionDto[i].surveyDto.survey_id);
                  ingTitle.push(surveyQuestionDto[i].surveyDto.survey_title);
                  surveyQuestionDtoTemp.push(surveyQuestionDto[i]);
               }
            }
            for (let i = 0; i < surveyQuestionDto.length; i++) {
               if (surveyQuestionDto[i].surveyDto.survey_state === 1) {
                  //시작 전
                  beforeUrl.push(surveyQuestionDto[i].surveyDto.survey_url);
                  beforeId.push(surveyQuestionDto[i].surveyDto.survey_id);
                  beforeTitle.push(surveyQuestionDto[i].surveyDto.survey_title);
                  surveyQuestionDtoTemp.push(surveyQuestionDto[i]);

               }
            }
            for (let i = 0; i < surveyQuestionDto.length; i++) {
               if (surveyQuestionDto[i].surveyDto.survey_state === 2) {
                  //종료
                  endUrl.push(surveyQuestionDto[i].surveyDto.survey_url);
                  endId.push(surveyQuestionDto[i].surveyDto.survey_id);
                  endTitle.push(surveyQuestionDto[i].surveyDto.survey_title);
                  surveyQuestionDtoTemp.push(surveyQuestionDto[i]);
               }
            }

            // console.log('surveyQuestionDtoTemp', surveyQuestionDtoTemp);
            setSurveyQuestionDto(surveyQuestionDtoTemp);
            // console.log('surveyQuestionDtoState', surveyQuestionDtoState);

            setIngUrl(ingUrl);
            setIngId(ingId);
            setIngTitle(ingTitle);
            setIngCount(ingUrl.length);
            setSelectNum(1);

            setBeforeUrl(beforeUrl);
            setBeforeId(beforeId);
            setBeforeTitle(beforeTitle);
            setBeforeCount(beforeUrl.length);

            setEndUrl(endUrl);
            setEndId(endId);
            setEndTitle(endTitle);
            setEndCount(endUrl.length);

         }, (err) => console.log(err))

         GetUserAnswer(users.id)
         .then((res) => {
            console.log('reply res: ', res);
            userAnswerDto = JSON.parse(res);
            console.log("userAnswerDto", userAnswerDto);
            setUserAnswerDto(userAnswerDto);

            if (userAnswerDto != null) {
               for (let i = 0; i < userAnswerDto.length; i++) {
                  ingAnswerId.push(userAnswerDto[i].survey_id)
                  console.log("userAnswerDto", userAnswerDto[i].survey_id)

                  //survey title만 붙여올 수는 없는지.
                  GetSurveyBySurveyId(userAnswerDto[i].survey_id, users, userHandler)
                     .then((res) => {
                        if (res.surveyDto !== undefined) {
                           if (res.surveyDto.survey_state === 0) {
                              ingSurveyDtoState.push(res);
                              ingAnswerDtoState.push(userAnswerDto[i]);
                              ingAnswerTitle.push(res.surveyDto.survey_title);
                              ingAnswerUrl.push(res.surveyDto.survey_url);
                           }
                           else if (res.surveyDto.survey_state === 2) {
                              endSurveyDtoState.push(res);
                              endAnswerDtoState.push(userAnswerDto[i]);
                              endAnswerTitle.push(res.surveyDto.survey_title);
                              endAnswerUrl.push(res.surveyDto.survey_url);
                           }
                        }

                     })

               }
            }

            //ing
            setIngSurveyDto(ingSurveyDtoState)
            setIngAnswerDto(ingAnswerDtoState);
            setIngAnswerId(ingAnswerId);
            setIngAnswerTitle(ingAnswerTitle);
            setIngAnswerCount(ingAnswerId.length);
            setIngAnswerUrl(ingAnswerUrl);
            console.log("answerdto", ingAnswerDtoState);

            //end
            setEndSurveyDto(endSurveyDtoState);
            setEndAnswerDto(endAnswerDtoState);
            setEndAnswerId(endAnswerId);
            setEndAnswerTitle(endAnswerTitle);
            setEndAnswerCount(endAnswerId.length);
            setEndAnswerUrl(endAnswerUrl);
            console.log("answerdto", endAnswerDtoState);
         })

   }, []);

   return (
      <Main>
         {viewSwitch === "제작" && <div>
            <Row>
               <div >
                  <div style={{ float: 'left' }}>
                     <DropdownButton variant='secondary' id="dropdown-basic-button" title="제작한 설문">
                        <Dropdown.Item className='menu' onClick={() => { setViewSwitch("응답"); forceUpdate(); }}>응답한 설문</Dropdown.Item>
                     </DropdownButton>
                  </div>
               </div>

               <Row>
                  <Col md="20" style={{ marginTop: '10px' }}>
                     <Accordion alwaysOpen>
                        <Accordion.Item >
                           <Accordion.Header>진행 중인 설문</Accordion.Header>
                           <Accordion.Body>
                              <ListGroup defaultActiveKey="aboutCommon" className='basicCard' style={{ paddingTop: 5, textAlign: 'left' }} >
                                 {
                                    ingId.length === ingCount && ingId && ingId.map((idx, value) =>
                                       <ListGroup.Item action variant='light' className="d-flex justify-content-between  align-items-start" onClick={() => { setSelectNum(value); surveyRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>

                                          <div>
                                             <strong style={{ fontSize: '15px' }}>{surveyQuestionDtoState[value].surveyDto.survey_title}</strong>
                                             <div style={{ fontSize: '12px' }}>{surveyQuestionDtoState[value].surveyDto.description}</div>
                                          </div>

                                          <Badge bg="light" text="dark" pill>
                                             {surveyQuestionDtoState[value].surveyDto.start_time} &nbsp; ~ &nbsp; {surveyQuestionDtoState[value].surveyDto.end_time}
                                          </Badge>

                                       </ListGroup.Item>
                                    )
                                 }
                              </ListGroup>
                           </Accordion.Body>
                        </Accordion.Item>


                        <Accordion.Item eventKey='1'>
                           <Accordion.Header>시작 전 설문</Accordion.Header>
                           <Accordion.Body>
                              <ListGroup defaultActiveKey="aboutCommon" className='basicCard' style={{ paddingTop: 5, textAlign: 'left' }} >
                                 {
                                    beforeId.length === beforeCount && beforeId && beforeTitle.map((idx, value) =>
                                       <ListGroup.Item action variant='light' className="d-flex justify-content-between  align-items-start" onClick={() => { setSelectNum(value + ingCount); surveyRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>

                                          <div>
                                             <strong style={{ fontSize: '15px' }}>{surveyQuestionDtoState[value + ingCount].surveyDto.survey_title}</strong>
                                             <div style={{ fontSize: '12px' }}>{surveyQuestionDtoState[value + ingCount].surveyDto.description}</div>
                                          </div>

                                          <Badge bg="light" text="dark" pill>
                                             {surveyQuestionDtoState[value + ingCount].surveyDto.start_time} &nbsp; ~ &nbsp; {surveyQuestionDtoState[value + ingCount].surveyDto.end_time}
                                          </Badge>

                                       </ListGroup.Item>
                                    )
                                 }
                              </ListGroup>

                           </Accordion.Body>
                        </Accordion.Item>


                        <Accordion.Item eventKey='2'>
                           <Accordion.Header>종료된 설문</Accordion.Header>
                           <Accordion.Body>
                              <ListGroup defaultActiveKey="aboutCommon" className='basicCard' style={{ paddingTop: 5, textAlign: 'left' }} >

                                 {
                                    endId.length === endCount && endId && endTitle.map((idx, value) =>
                                       <ListGroup.Item action variant='light' className="d-flex justify-content-between  align-items-start" onClick={() => { setSelectNum(value + ingCount + beforeCount); surveyRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>

                                          <div>
                                             <strong style={{ fontSize: '15px' }}>{surveyQuestionDtoState[value + ingCount + beforeCount].surveyDto.survey_title}</strong>
                                             <div style={{ fontSize: '12px' }}>{surveyQuestionDtoState[value + ingCount + beforeCount].surveyDto.description}</div>
                                          </div>

                                          <Badge bg="light" text="dark" pill>
                                             {surveyQuestionDtoState[value + ingCount + beforeCount].surveyDto.start_time} &nbsp; ~ &nbsp; {surveyQuestionDtoState[value + ingCount + beforeCount].surveyDto.end_time}
                                          </Badge>

                                       </ListGroup.Item>
                                    )
                                 }
                              </ListGroup>

                           </Accordion.Body>
                        </Accordion.Item>
                     </Accordion>

                     <div style={{ marginTop: '20px' }}>
                        <Button variant="light" className='btn-list' onClick={() => { view.current = "설문지"; forceUpdate(); }}>설문지 조회</Button>
                        <Button variant="light" className='btn-list' onClick={() => { view.current = "결과"; forceUpdate(); }}>설문 결과 조회</Button>
                        <Button variant="light" className='btn-list' onClick={() => { view.current = "응답자"; forceUpdate(); }}>응답자 조회</Button>
                        <Button variant="light" className='btn-list' onClick={handleDeleteBtn}>설문 삭제</Button>
                        {/* <DeleteSurvey ref={childRef} surveyId={surveyId} /> */}
                     </div>

                  </Col>
                  <div ref={surveyRef} />

                  {/* view(설문지보기/결과보기/응답자보기/삭제) 에 따라 보여지는 화면이 바뀜. view는 각 버튼을 누르게 되면 변경됨 */}
                  {/* 설문지 보기 */}
                  {view.current === "설문지" && selectNum !== -1 &&
                     <Col style={{ marginTop: '30px', marginBottom: '30px' }}>
                        {surveyQuestionDtoState[selectNum] !== undefined && <SurveyView link={surveyQuestionDtoState[selectNum].surveyDto.survey_url} surveyQuestionDto={surveyQuestionDtoState[selectNum]} />}
                     </Col>}


                  {/* 설문 결과 보기 (그래프) */}
                  {view.current === "결과" && selectNum !== -1 &&
                     <Col style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <Result surveyId={surveyQuestionDtoState[selectNum].surveyDto.survey_id} />
                     </Col>}


                  {/* 응답자 보기(응답자 리스트, 응답자 성별 및 나이 그래프) */}
                  {view.current === "응답자" && selectNum !== -1 &&
                     <Col style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <Respondent surveyId={surveyQuestionDtoState[selectNum].surveyDto.survey_id} />
                     </Col>}


                  {/* 설문지 삭제하기 */}
                  {view.current === "삭제" && selectNum !== -1 &&
                     <>
                        <Col style={{ marginTop: '30px', marginBottom: '30px' }} ref={surveyRef}>
                           <SurveyView surveyQuestionDto={surveyQuestionDtoState[selectNum]} />
                        </Col>

                        <Modal show={show} onHide={() => { setShow(false); }}  >
                           <Modal.Body style={{ textAlign: "center" }}>
                              <br/>
                              <h3>설문을 삭제하시겠습니까?<br /></h3>
                           </Modal.Body>
                           <Modal.Footer>
                              <Button variant="secondary" onClick={handleDelete}>확인</Button>
                              <Button variant="light" onClick={() => { setShow(false); forceUpdate(); }}>취소</Button>
                           </Modal.Footer>
                        </Modal>


                        {/* 진행중인 설문을 삭제할 때 */}
                        <Modal show={showDeleteIng} onHide={() => { setShowDeleteIng(false); }} centerd>
                           <Modal.Body style={{ textAlign: "center" }}>
                              <br />
                              <h4>진행 중인 설문은 삭제할 수 없습니다 😅<br /></h4>
                           </Modal.Body>
                           <Modal.Footer>
                              <Button variant="secondary" onClick={() => { setShowDeleteIng(false); forceUpdate(); }}>확인</Button>
                           </Modal.Footer>
                        </Modal>
                     </>
                  }
               </Row>
            </Row>
         </div>}

         {viewSwitch === "응답" && <div>
            <Row>
               <Row>
                  <Col style={{ marginTop: '10px', marginBottom: '10px' }}>
                     <DropdownButton variant='secondary' id="dropdown-basic-button" title="응답한 설문">
                        <Dropdown.Item onClick={() => { setViewSwitch("제작"); forceUpdate(); }}>제작한 설문</Dropdown.Item>
                     </DropdownButton>
                  </Col>
               </Row>
               <Row>
                  <Col md="20" style={{ marginTop: '5px' }}>
                     <Accordion alwaysOpen>
                        <Accordion.Item>
                           <Accordion.Header>진행 중인 설문</Accordion.Header>

                           <Accordion.Body>
                           <ListGroup defaultActiveKey="aboutCommon" className='basicCard' style={{ paddingTop: 5, textAlign: 'left' }} >

                              {
                                 // console.log("ingAnswerId", ingAnswerId)
                                 ingAnswerId.length === ingAnswerCount && ingAnswerId && ingAnswerTitle.map((idx, value) =>
                                    // <ListGroup.Item key={idx} onClick={() => {  }}>
                                    //   {value}
                                    //    </ListGroup.Item>)
                                    <ListGroup.Item action variant='light' className="d-flex justify-content-between  align-items-start" onClick={() => { setSurveyType(0); setAnswerSelectNum(value); surveyRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>

                                       <div>
                                          <strong style={{ fontSize: '15px' }}>{ingSurveyDtoState[value].surveyDto.survey_title}</strong>
                                          <div style={{ fontSize: '12px' }}>{ingSurveyDtoState[value].surveyDto.description}</div>
                                       </div>

                                       <Badge bg="light" text="dark" pill>
                                          {ingSurveyDtoState[value].surveyDto.start_time} &nbsp; ~ &nbsp; {ingSurveyDtoState[value].surveyDto.end_time}
                                       </Badge>

                                    </ListGroup.Item>
                                 )
                              }
                              </ListGroup>
                           </Accordion.Body>
                        </Accordion.Item>
                     </Accordion>

                     <Accordion defaultActiveKey="0">
                        <Accordion.Item>
                           <Accordion.Header>종료된 설문</Accordion.Header>
                           <Accordion.Body>
                              {
                                 endAnswerId.length === endAnswerCount && endAnswerId && endAnswerTitle.map((value, idx) => <ListGroup.Item key={idx} onClick={() => { setSurveyType(1); setAnswerSelectNum(idx); }}><Button key={idx} style={{ backgroundColor: "transparent", color: "black", border: "none" }}>{value}</Button></ListGroup.Item>)
                              }
                           </Accordion.Body>
                        </Accordion.Item>
                     </Accordion>
                  </Col>
                  {answerSelectNum !== -1 &&
                     <Col ref={surveyRef}>

                        <>

                           {

                              surveyType === 0 ?


                                 <AnswerView surveyDto={ingSurveyDtoState[answerSelectNum]} answersDto={ingAnswerDtoState[answerSelectNum]} />


                                 :

                                 surveyType === 1 ?

                                    <AnswerView surveyDto={endSurveyDtoState[answerSelectNum]} answersDto={endAnswerDtoState[answerSelectNum]} />

                                    :

                                    {}
                           }
                           {/* </Card> */}
                        </>
                     </Col>}
               </Row>
            </Row>
         </div>}
      </Main>
   )
}

export { Workspace }