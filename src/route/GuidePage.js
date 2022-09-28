import {Card, ListGroup, Row, Col, Accordion} from 'react-bootstrap'

function GuidePage() {
  return(
		<>
			<Row>
				<Col md="3">
					<ListGroup>
						<Accordion>
							<Accordion.Item>
								<Accordion.Header>자주하는 질문</Accordion.Header>
								<Accordion.Body>
									<ListGroup.Item>설문 제작시</ListGroup.Item>
									<ListGroup.Item>설문 응답시</ListGroup.Item>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<ListGroup.Item>문의하기</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col>
					<Card style={{height: 700, paddingTop: 20, textAlign: "center"}}>설문 가이드</Card>
				</Col>
				<Col md="1">
				</Col>
			</Row>
		</>
  )
}

export {GuidePage};