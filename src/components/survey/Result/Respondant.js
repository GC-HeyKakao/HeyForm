import { useEffect } from 'react';
import { Card, CloseButton, Row, Col } from 'react-bootstrap'
import Gender from './Gender';
import Calendar from './Calendar'
import Age from './Age'

function Respondant(props) {

	return (
		<>
			<div style={{ padding: "3%", textAlign: "center" }}>
				<h3>🔍 설문 응답자 분석 🔍</h3>
				{/* 응답자 분석  */}
				<Row style={{ marginTop: "10%" }}>
					<Col>
						<h4>💁‍♂️ 성별 💁‍♀️</h4>
						<Gender></Gender>
					</Col>
				</Row>
				<Row>
					<Col>
						<h4>👶 연령대 👴</h4>
						<Age></Age>
					</Col>
				</Row>
				<Row style={{ marginTop: "20%" }}>
					<Col>
						<h4>📅 언제 응답했을까요? 📅</h4>
						<Calendar></Calendar>
					</Col>
				</Row>
			</div>
			<div style={{ padding: "3%", textAlign: "center" }}>
				<h3>📮 응답자 목록 📮</h3>
				<Row style={{ marginTop: "10%" }}>
					<Col>
						{/* 응답자 목록 테이블  */}
					</Col>
				</Row>
			</div>
		</>
	)
}

export { Respondant }