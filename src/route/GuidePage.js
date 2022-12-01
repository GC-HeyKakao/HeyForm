import React, { useState } from 'react';
import { Accordion, Col, ListGroup, Row } from 'react-bootstrap';
import { Footer } from '../components/Footer.js';
import { FAQ } from '../components/Guide/FAQ/FAQ';
import { FaqCreate } from '../components/Guide/FAQ/FaqCreate';
import { FaqReply } from '../components/Guide/FAQ/FaqReply';
import { WriteAsk } from '../components/Guide/WriteAsk';
import './GuidePage.css';
// @mui
import { styled } from '@mui/material/styles';

const Main = styled('div')(({ theme }) => ({

    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
       paddingLeft: theme.spacing(6),
       paddingRight: theme.spacing(6),
    },
 }));

function GuidePage() {

    let [viewSwitch, setViewSwitch] = useState('aboutCommon');

    return (
        <Main>
        <div className='body'>
                    <Row>
                        <Col md="4">
                            <ListGroup defaultActiveKey="aboutCommon" className='basicCard' style={{ paddingTop: 5, textAlign:'left' }} onSelect={(e) => setViewSwitch(e)}>
                                <Accordion style={{marginBottom:10}}>
                                    <Accordion.Item>
                                        <Accordion.Header>자주하는 질문</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup.Item action variant="light" eventKey="aboutCommon">공통</ListGroup.Item>
                                            <ListGroup.Item action variant="light" eventKey="aboutCreate">설문지 제작</ListGroup.Item>
                                            <ListGroup.Item action variant="light" eventKey="aboutReply">설문지 응답</ListGroup.Item>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <ListGroup.Item style={{marginBottom: '20px'}} action variant="light" eventKey="ask">의견 남기기</ListGroup.Item>
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
        </Main>
    )
}

export { GuidePage };

