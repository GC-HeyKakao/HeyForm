import React, { useState } from 'react';
import { Accordion, Col, ListGroup, Row } from 'react-bootstrap';
import { Footer } from '../components/Footer.js';
import { FAQ } from '../components/Guide/FAQ/FAQ';
import { FaqCreate } from '../components/Guide/FAQ/FaqCreate';
import { FaqReply } from '../components/Guide/FAQ/FaqReply';
import { WriteAsk } from '../components/Guide/WriteAsk';


function GuidePage() {

    let [viewSwitch, setViewSwitch] = useState('aboutCommon');

    return (
        <>
            <div className="wraper">
                <div className="content">
                    <Row>
                        <Col md="4">
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
                                <ListGroup.Item eventKey="ask">의겸 남기기</ListGroup.Item>
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

                                        </Col>

                                        :

                                        <>

                                            <Col>
                                                <WriteAsk />


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

