import { useEffect } from 'react';
import { Card, CloseButton, Row, Col } from 'react-bootstrap'
import Gender from './Gender';
import Calendar from './Calendar'
import Age from './Age'

function Respondant(props) {

	return (
		<>
			<div style={{ padding: "2%" }}>
				<Card className='basicCard' style={{ padding: "3%", textAlign: "center" }}>
					<Card.Body>
						<Card.Title><h2>🔍 설문 응답자 분석 🔍</h2></Card.Title>
						{/* 응답자 분석  */}
						<Row style={{ marginTop: "10%" }}>
							<h3>💁‍♂️ 성별 💁‍♀️</h3>
							<Col>
								<Gender></Gender>
							</Col>
							<Col>
								<Card className='basicCard'>
									<Card.Text>남자는 몇명 여자는 몇명이네요</Card.Text>
								</Card>
							</Col>
						</Row>
						<Row>
							<h3>👶 연령대 👴</h3>
							<Col>
								<Age></Age>
							</Col>
							<Col>
								<Card className='basicCard'>
									<Card.Text>남자는 몇명 여자는 몇명이네요</Card.Text>
								</Card>
							</Col>
						</Row>
						<Row style={{ marginTop: "20%" }}>
							<Col>
								<h3>📅 언제 응답했을까요? 📅</h3>
								<Calendar></Calendar>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</div>
		</>
	)
}

export { Respondant }