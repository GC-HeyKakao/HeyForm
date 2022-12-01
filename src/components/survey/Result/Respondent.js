import { Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Age from './Age';
import Calendar from './Calendar';
import Gender from './Gender';
import { GetResult } from '../../../API/Result/GetResult'

function Respondent(props) {

	const [resultDto, setResultDto] = useState();
	const surveyId = props.surveyId;
	console.log(surveyId);

	const [savedQsList, setSavedQsList] = useState([]);

	useEffect(() => {

        //사용자 토큰으로 모든 survey정보를 가져와서 워크스페이스를 구성한다. 
        GetResult(surveyId)
           .then((res) => {
            console.log('Result res: ', res);
            console.log('result res type ', typeof(res));
            setResultDto(res);
           }, (err) => console.log(err))
  
     }, [props]);

	 console.log("result", resultDto);

	return (
		<>

		{

			resultDto!==undefined?
			
			
				<div style={{ padding: "3%", textAlign: "center" }}>
				<h3>🔍 설문 응답자 분석 🔍</h3>
				{/* 응답자 분석  */}
				<Row style={{ marginTop: "5%" }}>
					<Col>
						<h4>💁‍♂️ 성별 💁‍♀️</h4>
						<Gender gender = {resultDto[1][1]} ></Gender>
					</Col>
				</Row>
				<Row style={{ marginTop: "10%" }}>
					<Col>
						<h4>👶 연령대 👴</h4>
						<Age age = {resultDto[1][2]}></Age>
					</Col>
				</Row>
				<Row style={{ marginTop: "15%" }}>
					<Col>
						<h4>📅 언제 응답했을까요? 📅</h4>
						<Calendar></Calendar>
					</Col>
				</Row>
			</div>
			

			:null
			

		}
		</>
	)
}

export { Respondent };
