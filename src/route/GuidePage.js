import { useState, useEffect} from 'react';
import {Card, ListGroup, Row, Col, Accordion} from 'react-bootstrap'
import React from 'react';
import { FAQ } from '../components/FAQ/FAQ'
import { FaqCreate } from '../components/FAQ/FaqCreate'
import { FaqReply } from '../components/FAQ/FaqReply'
import { WriteAsk } from '../WriteAsk';


// function alertDialogBox(message) {
// 	alert(message)
// }

function GuidePage() {

    let [viewSwitch, setViewSwitch] = useState('aboutCommon');

  return(
        <>
            <Row>
                <Col md="3">
                    <ListGroup variant="pills" defaultActiveKey="aboutCommon" className='basicCard' style={{paddingTop: 5}} onSelect={(e)=>setViewSwitch(e)}>
                        <Accordion>
                            <Accordion.Item>
                                <Accordion.Header>자주하는 질문</Accordion.Header>
                                <Accordion.Body>
									<ListGroup.Item eventKey="aboutCommon">공통</ListGroup.Item>
                                    <ListGroup.Item eventKey="aboutCreate">설문 제작시</ListGroup.Item>
                                    <ListGroup.Item eventKey="aboutReply">설문 응답시</ListGroup.Item>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <ListGroup.Item eventKey="ask">문의하기</ListGroup.Item>
                    </ListGroup>
                </Col>


                {
                
                viewSwitch=='aboutCommon'?

                <Col>
					<FAQ />
                </Col>
                
                :


                viewSwitch=='aboutCreate'?

                <Col>
					<FaqCreate />
                    {/* <CreateFAQ /> */}
                    
                </Col>
                
                :

                viewSwitch=='aboutReply'?

                <Col>
					<FaqReply />
                    {/* <Card style={{height: 700, paddingTop: 20, textAlign: "center"}}>설문 응답시</Card> */}
					
                </Col>

                :
                
                <>

                <Col>
                    <WriteAsk />
                {/* <Card style={{height: 700, paddingTop: 20, textAlign: "center"}}>문의하기</Card> */}
				
                </Col>

                </>
                }


            </Row>

                
                
        </>
                
  )
}

export {GuidePage};

