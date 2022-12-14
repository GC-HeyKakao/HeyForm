import { useState, useEffect } from 'react';
import { Card, CloseButton, Row, Col } from 'react-bootstrap'
import LikertChartResult from './LikertChartResult';
import StarResult from './StarResult';
import SliderResult from './SliderResult';
import MultipleChoice from './MultipleChoice';
import { ShortAnswer } from './ShortAnswer';
import Table from './Table';
import { GetResult } from '../../../API/Result/GetResult'

function Result(props) {

    const surveyDto = props.surveyQuestionDto;
    const surveyId = props.surveyId;
    const [resultDto, setResultDto] = useState();
    console.log("result", props.surveyQuestionDto);

    const [savedQsList, setSavedQsList] = useState([]);

    useEffect(() => {
        setSavedQsList(surveyDto.questionDtos);

        //사용자 토큰으로 모든 survey정보를 가져와서 워크스페이스를 구성한다. 
        GetResult(surveyId)
            .then((res) => {
                console.log('Result res: ', res);
                console.log('result res type ', typeof (res));
                setResultDto(res);
            }, (err) => console.log(err))

    }, [props]);


    return (

        <>
            <Card style={{ padding: "3%", textAlign: "center" }}>
                <h3><strong>🔮 설문 결과 분석 🔮</strong></h3>

                {
                    resultDto && savedQsList && savedQsList.map((item) => {
                        return (
                            {
                                '단답식':
                                    <Card className='basicCard' style={{ margin: "5%", marginBottom: "3%", padding: "3%", borderRadius: "20px" }}>
                                        <Card.Body>
                                            <ShortAnswer resultDto={resultDto} idx={item['question_order'] + 1} title={item['question_contents']}></ShortAnswer>
                                        </Card.Body>
                                    </Card>,

                                '객관식':
                                    <Card className='basicCard' style={{ margin: "5%", marginBottom: "3%", padding: "3%", borderRadius: "20px" }}>
                                        <Card.Body>
                                            <MultipleChoice choiceDto={item['choiceDtos']} resultDto={resultDto} idx={item['question_order'] + 1} title={item['question_contents']}></MultipleChoice>
                                        </Card.Body>
                                    </Card>,


                                '별점':
                                    <Card className='basicCard' style={{ margin: "5%", marginBottom: "3%", padding: "3%", borderRadius: "20px" }}>
                                        <Card.Body>
                                            <StarResult resultDto={resultDto} idx={item['question_order'] + 1} title={item['question_contents']}></StarResult>
                                        </Card.Body>
                                    </Card>,

                                '리커트':
                                    <Card className='basicCard' style={{ margin: "5%", marginBottom: "3%", padding: "3%", borderRadius: "20px" }}>
                                        <Card.Body>
                                            <LikertChartResult resultDto={resultDto} idx={item['question_order'] + 1} title={item['question_contents']}></LikertChartResult>
                                        </Card.Body>
                                    </Card>,

                                '감정바':
                                    <Card className='basicCard' style={{ margin: "5%", marginBottom: "3%", padding: "3%", borderRadius: "20px" }}>
                                        <Card.Body>
                                            <SliderResult resultDto={resultDto} idx={item['question_order'] + 1} title={item['question_contents']}></SliderResult>
                                        </Card.Body>
                                    </Card>,

                            }[item['question_type']]


                        )

                    }
                    )
                }

                {/* <div style={{ marginTop: "10%" }}>
                    <h3 style={{ marginTop: "10%" }}>📌 설문 응답 결과 📌</h3>
                    <Row style={{ marginTop: "5%" }}>
                        <Col>
                            <Table>
                            </Table>
                        </Col>
                    </Row> */}
                {/* </div>
                응답자 분석 
                <Row style={{ marginTop: "5%" }}>
                    <Col> */}
                {/* 설문 결과 그래프 */}
                {/* <LikertChartResult></LikertChartResult>
                    </Col>
                </Row>                
                <Row style={{ marginTop: "10%" }}>
                    <Col> */}
                {/* 설문 결과 그래프 */}
                {/* <SliderResult></SliderResult>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10%" }}>
                    <Col> */}
                {/* 설문 결과 그래프 */}
                {/* <StarResult></StarResult>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10%" }}>
                    <Col> */}
                {/* 설문 결과 그래프 */}
                {/* <MultipleChoice></MultipleChoice>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10%", width:"auto", marginBottom: "10%" }}>
                    <Col>
                        <ShortAnswer></ShortAnswer>
                    </Col>
                </Row>
                <div style={{ marginTop: "10%" }}>
                    <h3 style={{ marginTop: "10%" }}>📌 설문 응답 결과 📌</h3>
                    <Row style={{ marginTop: "5%" }}>
                        <Col> */}
                {/* 응답자 목록 테이블  */}
                {/* <Table>
                            </Table>
                        </Col>
                    </Row> */}
                {/* </div> */}
            </Card>
        </>
    )
}

export { Result }