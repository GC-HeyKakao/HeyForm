import { useState, useEffect } from 'react';
import { Card, ListGroup, Row, Col, Accordion } from 'react-bootstrap'
import React from 'react';
import { FAQ } from '../components/Guide/FAQ/FAQ'
import { FaqCreate } from '../components/Guide/FAQ/FaqCreate'
import { FaqReply } from '../components/Guide/FAQ/FaqReply'
import { Footer } from '../components/Footer.js'
import { WriteAsk } from '../components/Guide/WriteAsk';


// function alertDialogBox(message) {
// 	alert(message)
// }

function GuidePage() {

    let [viewSwitch, setViewSwitch] = useState('aboutCommon');

    return (
        <>
            <div className="wraper">
                <div className="content">
                    <Row>
                        <Col md="3">
                            <ListGroup variant="pills" defaultActiveKey="aboutCommon" className='basicCard' style={{ paddingTop: 5 }} onSelect={(e) => setViewSwitch(e)}>
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

                            viewSwitch == 'aboutCommon' ?

                                <Col>
                                    <FAQ />
                                </Col>

                                :


                                viewSwitch == 'aboutCreate' ?

                                    <Col>
                                        <FaqCreate />
                                        {/* <CreateFAQ /> */}

                                    </Col>

                                    :

                                    viewSwitch == 'aboutReply' ?

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
                </div>
                <Footer />
            </div>
        </>
    )
}

export { GuidePage };

