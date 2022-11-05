import { Card, Dropdown, DropdownButton, ListGroup, Button, Row, Col, Modal, Form, Accordion } from 'react-bootstrap'
import { Result } from '../components/Survey/Result/Result';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Respondent } from '../components/Survey/Result/Respondent';
import { SurveyView } from '../components/Workspace/SurveyView'
import { tokenState } from '../atom';
import { GetSurveyByToken } from '../API/Survey/GetSurveyByToken'
import { useRecoilValue } from 'recoil';
import { DeleteSurvey } from '../API/Survey/DeleteSurvey';

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
   const [selectNum, setSelectNum] = useState(-1);

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
   var AnswerIngId = new Array();
   var AnswerEndId = new Array();

   //제작 및 응답한 설문지 기간 조회에 사용됨
   const [startDate, setStartDate] = useState(dateString);
   const [endDate, setEndDate] = useState(preDateString);
   const token = useRecoilValue(tokenState);

   //Modal
   const [show, setShow] = useState(false);
   const [showDeleteIng, setShowDeleteIng] = useState(false);
   const [, updateState] = useState();
   const forceUpdate = useCallback(() => updateState({}, []));
   const [viewSwitch, setViewSwitch] = useState('제작');

   const [surveyQuestionDtoState, setSurveyQuestionDto] = useState();
   let surveyQuestionDto;
   let surveyQuestionDtoTemp;

   function handleDeleteBtn() {
      view.current = "삭제";
      if (selectNum + 1 <= ingCount) {
         setShowDeleteIng(true);
      } else {
         setShow(true);
      }
   }
   //설문 '삭제' 클릭 -> '설문을 삭제하시겠습니까?' 에서 '확인'을 클릭하면 실행
   function handleDelete() {
      setShow(false);
      view.current = '설문지';
      console.log('if selectNum', selectNum);
      console.log('if ingCount', ingCount);
      console.log('if beforeCount', beforeCount);
      if (ingCount < selectNum + 1 && selectNum + 1 <= ingCount + beforeCount) {
         //시작 전
         console.log('if selectNum', selectNum);
         console.log('if ingCount', ingCount);
         console.log('if beforeCount', beforeCount);
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
      //사용자 토큰으로 모든 survey정보를 가져와서 워크스페이스를 구성한다. 
      GetSurveyByToken(localStorage.getItem('ttoken'))
         .then((res) => {
            console.log('res: ', res);
            surveyQuestionDto = JSON.parse(JSON.stringify(res));
            surveyQuestionDtoTemp = new Array();
            console.log('surveyQuestionDto', surveyQuestionDto);

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

            setSurveyQuestionDto(surveyQuestionDtoTemp);

            setIngUrl(ingUrl);
            setIngId(ingId);
            setIngTitle(ingTitle);
            setIngCount(ingUrl.length);
            setSelectNum(0);

            setBeforeUrl(beforeUrl);
            setBeforeId(beforeId);
            setBeforeTitle(beforeTitle);
            setBeforeCount(beforeUrl.length);

            setEndUrl(endUrl);
            setEndId(endId);
            setEndTitle(endTitle);
            setEndCount(endUrl.length);

         }, (err) => console.log(err))
   }, []);

   return (
      <>

         {viewSwitch === "제작" && <div>
            <Row>
               <Row style={{ marginTop: "2%", display: "flex" }}>
                  <Col md="3">
                     <DropdownButton id="dropdown-basic-button" title="제작한 설문지">
                        <Dropdown.Item onClick={() => { setViewSwitch("응답"); forceUpdate(); }}>응답한 설문지</Dropdown.Item>
                     </DropdownButton>
                  </Col>
                  <Col md="5" style={{ marginTop: "1.8%", textAlign: "right" }}>
                     {(selectNum !== -1) && <h5>{surveyQuestionDtoState[selectNum].surveyDto.start_time} &nbsp; ~ &nbsp; {surveyQuestionDtoState[selectNum].surveyDto.end_time}</h5>}
                  </Col>
                  <Col style={{ marginTop: "1%", marginBottom: "1%", float: "right" }}>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={() => { view.current = "설문지"; forceUpdate(); }}>설문지 보기</Button>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={() => { view.current = "결과"; forceUpdate(); }}>결과 보기</Button>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={() => { view.current = "응답자"; forceUpdate(); }}>응답자 보기</Button>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={handleDeleteBtn}>설문지 삭제</Button>
                     {/* <DeleteSurvey ref={childRef} surveyId={surveyId} /> */}
                  </Col>
               </Row>

               <Row>
                  <Col md="3">
                     <ListGroup >
                        <ListGroup>
                           <Accordion>
                              <Accordion.Item>
                                 <Accordion.Header>진행 중인 설문</Accordion.Header>
                                 <Accordion.Body>
                                    {
                                       ingId.length === ingCount && ingId && ingTitle.map((idx, value) =>
                                          <ListGroup.Item onClick={() => { setSelectNum(value); console.log('value', value); console.log('selectNum', selectNum); }}>
                                             <Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>{idx}</Button>
                                          </ListGroup.Item>)
                                    }
                                 </Accordion.Body>
                              </Accordion.Item>
                           </Accordion>


                           <Accordion>
                              <Accordion.Item>
                                 <Accordion.Header>시작 전 설문</Accordion.Header>
                                 <Accordion.Body>
                                    {
                                       beforeId.length === beforeCount && beforeId && beforeTitle.map((idx, value) =>
                                          <ListGroup.Item onClick={() => { setSelectNum(value + ingCount); console.log('value', value); console.log('selectNum', selectNum); }}>
                                             <Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>{idx}</Button>
                                          </ListGroup.Item>)
                                    }
                                 </Accordion.Body>
                              </Accordion.Item>
                           </Accordion>


                           <Accordion>
                              <Accordion.Item>
                                 <Accordion.Header>기간이 종료된 설문</Accordion.Header>
                                 <Accordion.Body>
                                    {
                                       endId.length === endCount && endId && endTitle.map((idx, value) =>
                                          <ListGroup.Item onClick={() => { setSelectNum(value + ingCount + beforeCount); console.log('value', value); console.log('selectNum', selectNum); }}>
                                             <Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>{idx}</Button>
                                          </ListGroup.Item>)
                                    }
                                 </Accordion.Body>
                              </Accordion.Item>
                           </Accordion>
                        </ListGroup>
                     </ListGroup>
                  </Col>

                  {/* view(설문지보기/결과보기/응답자보기/삭제) 에 따라 보여지는 화면이 바뀜. view는 각 버튼을 누르게 되면 변경됨 */}
                  {view.current === "설문지" && selectNum !== -1 &&
                     <Col>
                        <div className='basicCard'>
                           <Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
                              {/* <SurveyView surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} endDate={props.endDate} surveyId={selectNum} /> */}
                              <SurveyView surveyQuestionDto={surveyQuestionDtoState[selectNum]} />
                           </Card>
                        </div>
                     </Col>}
                  {view.current === "결과" && selectNum !== -1 &&
                     <Col>
                        <div className='basicCard'>
                           <Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
                              <Result surveyId={selectNum} />
                           </Card>
                        </div>
                     </Col>}

                  {view.current === "응답자" && selectNum !== -1 &&
                     <Col>
                        <Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
                           <Respondent surveyId={selectNum} />
                        </Card>
                     </Col>}

                  {view.current === "삭제" && selectNum !== -1 &&
                     <>
                        <Col>
                           <div className='basicCard'>
                              <Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
                                 <SurveyView surveyQuestionDto={surveyQuestionDtoState[selectNum]} />
                              </Card>
                           </div>
                        </Col>

                        <Modal show={show} onHide={() => { setShow(false); }}>
                           <Modal.Body style={{ textAlign: "center" }}>
                              <br />
                              <h2>설문을 삭제하시겠습니까?<br /></h2>
                              <br />
                              <Button style={{ marginRight: "20px" }} onClick={handleDelete}>확인</Button>
                              <Button onClick={() => { setShow(false); forceUpdate(); }}>취소</Button>
                           </Modal.Body>
                        </Modal>


                        {/* 진행중인 설문을 삭제할 때 */}
                        <Modal show={showDeleteIng} onHide={() => { setShowDeleteIng(false); }}>
                           <Modal.Body style={{ textAlign: "center" }}>
                              <br />
                              <h4>진행 중인 설문은 삭제할 수 없습니다 😅<br /></h4>
                              <br />
                              <Button onClick={() => { setShowDeleteIng(false); forceUpdate(); }}>확인</Button>
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
                                 <Accordion.Header>진행 중인 설문</Accordion.Header>
                                 <Accordion.Body>
                                    {
                                       AnswerIngId.map((idx) => <ListGroup.Item onClick={() => { setSelectNum(idx); }}><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>진행 설문{idx}</Button></ListGroup.Item>)
                                    }
                                 </Accordion.Body>
                              </Accordion.Item>
                           </Accordion>

                           <Accordion>
                              <Accordion.Item>
                                 <Accordion.Header>종료된 설문</Accordion.Header>
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