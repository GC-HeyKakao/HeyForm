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
            {/* 설문 결과 분석  */}
            <h1>설문 결과 분석</h1>
            <LikertChartResult></LikertChartResult>
            <SliderResult></SliderResult>
            <StarResult></StarResult>
            <MultipleChoice></MultipleChoice>
            <EssayQuestion></EssayQuestion>
        </>
    )
}

export { Result }