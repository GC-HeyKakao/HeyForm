import { useEffect } from 'react';
import { Card, CloseButton, Row, Col } from 'react-bootstrap'
import LikertChartResult from './LikertChartResult';
import StarResult from './StarResult';
import SliderResult from './SliderResult';
import MultipleChoice from './MultipleChoice';
import EssayQuestion from './EssayQuestion';

function Result(props) {

    return (

        <>
            <div style={{ padding: "3%", textAlign: "center" }}>
                <h3>🔮 설문 결과 분석 🔮</h3>
                {/* 응답자 분석  */}
                <Row style={{ marginTop: "10%" }}>
                    <Col>
                        {/* 설문 결과 그래프 */}
                        <LikertChartResult></LikertChartResult>
                        <SliderResult></SliderResult>
                        <StarResult></StarResult>
                        <MultipleChoice></MultipleChoice>
                        <EssayQuestion></EssayQuestion>
                    </Col>
                </Row>
                <div style={{ marginTop: "10%" }}>
                    <h3><hr></hr>📌 설문 응답 결과 📌</h3>
                    <Row>
                        <Col>
                            {/* 응답자 목록 테이블  */}
                        </Col>
                    </Row>
            </div>
        </div>
        </>
    )
}

export { Result }