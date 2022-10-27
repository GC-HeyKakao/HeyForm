import { useEffect } from 'react';
import { Card, CloseButton, Row, Col } from 'react-bootstrap'
import LikertChartResult from './LikertChartResult';
import StarResult from './StarResult';
import SliderResult from './SliderResult';
import MultipleChoice from './MultipleChoice';
import ShortAnswer from './ShortAnswer';
import Table from './Table';

function Result(props) {

    return (

        <>
            <div style={{ padding: "3%", textAlign: "center" }}>
                <h3>🔮 설문 결과 분석 🔮</h3>
                {/* 응답자 분석  */}
                <Row style={{ marginTop: "5%" }}>
                    <Col>
                        {/* 설문 결과 그래프 */}
                        <LikertChartResult></LikertChartResult>
                    </Col>
                </Row>                
                <Row style={{ marginTop: "10%" }}>
                    <Col>
                        {/* 설문 결과 그래프 */}
                        <SliderResult></SliderResult>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10%" }}>
                    <Col>
                        {/* 설문 결과 그래프 */}
                        <StarResult></StarResult>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10%" }}>
                    <Col>
                        {/* 설문 결과 그래프 */}
                        <MultipleChoice></MultipleChoice>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10%", width:"900px" }}>
                    <Col>
                        <ShortAnswer></ShortAnswer>
                    </Col>
                </Row>
                <div style={{ marginTop: "10%" }}>
                    <h3 style={{ marginTop: "10%" }}>📌 설문 응답 결과 📌</h3>
                    <Row style={{ marginTop: "5%" }}>
                        <Col>
                            {/* 응답자 목록 테이블  */}
                            <Table>
                            </Table>
                        </Col>
                    </Row>
            </div>
        </div>
        </>
    )
}

export { Result }