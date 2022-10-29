import { Card, Dropdown, DropdownButton, ListGroup, Button, Row, Col, Modal, Form, Accordion } from 'react-bootstrap'
import { Result } from '../components/Survey/Result/Result';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Respondent } from '../components/Survey/Result/Respondent';
import { useNavigate } from 'react-router-dom';
import { SurveyView } from '../components/Workspace/SurveyView'
import { tokenState } from '../atom';
import { GetSurveyByUserAccount } from '../API/Survey/GetSurveyByUserAccount'
import { useRecoilValue } from 'recoil';
import { CreateSurveyByURL } from '../API/Survey/CreateSurveyByURL';

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
   var ingUrl = new Array();
   const [ingUrl2, setEngUrl] = useState([]);
   var ingId = new Array();
   const [ingId2, setIngId] = useState([]);
   const [ingTitle, setIngTitle] = useState();
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
   const [selectNum, setSelectNum] = useState(-1);
   const [title, setTitle] = useState("");
   const [viewSwitch, setViewSwitch] = useState('제작');

   console.log("ingURL", ingUrl);

   const handleDelete = () => {
      //childRef.current.deleteSurvey(); 
      show.current = false;
      forceUpdate();
   }

   let surveyAllString;
   let surveyDto;

   useEffect(() => {

      for (var i = 0; i < localStorage.length; i++) {
         if (localStorage.getItem(localStorage.key(i)) == "Link" || localStorage.getItem(localStorage.key(i)) == "QR" || localStorage.getItem(localStorage.key(i)) == "shareWay") {
            ingUrl.push(window.localStorage.key(i));
         }

      }

      setEngUrl(ingUrl);
      console.log("옺=ㅐ지", ingUrl);

      for (var i = 0; i < ingUrl.length; i++) {
         CreateSurveyByURL(ingUrl[i])
            .then((res) => {

               surveyDto = res;
               console.log(res);
               //setTitle(surveyDto.surveyDto.survey_title);
               console.log("title", surveyDto.surveyDto.survey_title);
               ingId.push(surveyDto.surveyDto.survey_title);
               console.log("engeng", ingId);
               setIngId(ingId);
               setIngTitle(ingId);
               console.log("ingTitle", ingTitle);
               setCount(ingUrl2.length);
               console.log("count", count)

            }, (err) => console.log(err))

      }


   }, []);

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
                  <Col md="4" style={{ margin: "1%" }}>
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
                  <Col md="4" style={{ margin: "1%" }}>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={() => { view.current = "설문지"; forceUpdate(); }}>설문지 보기</Button>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={() => { view.current = "결과"; forceUpdate(); }}>결과 보기</Button>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={() => { view.current = "응답자"; forceUpdate(); }}>응답자 보기</Button>
                     <Button variant="primary" style={{ marginLeft: "1%", marginRight: "1%" }} onClick={() => { view.current = "삭제"; show.current = true; forceUpdate(); }}>삭제</Button>
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
                                       // console.log("map",ingId2)
                                       ingId.length === count && ingId2 && ingId2.map((idx, value) => <ListGroup.Item onClick={() => { setSelectNum(value); }}><Button style={{ backgroundColor: "transparent", color: "black", border: "none" }}>{idx}</Button></ListGroup.Item>)
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
                  {view.current === "설문지" && selectNum !== -1 &&
                     <Col>
                        <div className='basicCard'>
                           <Card style={{ overflow: "scroll", width: "auto", height: 600, textAlign: "center", paddingTop: 20 }}>
                              {/* <SurveyView surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} endDate={props.endDate} surveyId={selectNum} /> */}
                              <SurveyView surveyTitle='제목' surveyDescription='설명' endDate='2022-10-27' surveyUrl = {ingUrl2[selectNum]} surveyId={selectNum} />
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
                                 <SurveyView surveyTitle={'제목'} surveyDescription={'설명'} endDate={'2022-10-27'} surveyId={selectNum} />
                              </Card>
                           </div>
                        </Col>
                        <Modal show={show.current} onHide={() => { show.current = false; }}>
                           <Modal.Body style={{ textAlign: "center" }}>
                              <br />
                              <h2>설문을 삭제하시겠습니까?<br /></h2>
                              <br />
                              <Button style={{ marginRight: "20px" }} onClick={handleDelete}>확인</Button>
                              <Button onClick={() => { show.current = false; forceUpdate(); }}>취소</Button>
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