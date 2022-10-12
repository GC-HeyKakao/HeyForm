import { useEffect } from 'react';
import { Card, CloseButton } from 'react-bootstrap'
import Likertchart from './Likertchart';
import Slider from './Slider';
import Star from './Star';

function Preview(props) {
	// console.log("qs: " + props.curQs + " list: " + props.curQsItemList)

	return (
		<>
			<Card className='basicCard' style={{ padding: "3%" }}>
				<h2 style={{ marginBottom: "3%" }}>{props.surveyTitle}</h2>
				{
					props.savedQsList.map((savedQs, idx) => {
						return (
							{
								'주관식':
									// <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
									<Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
										<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											답변을 입력해주세요.
										</Card.Body>
									</Card>,
								'객관식':
									<Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
										<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											{
												savedQs['qsItemList'].map(
													(qsItem, idx) => <Card key={idx}>{idx + 1}. {qsItem}</Card>
												)
											}
										</Card.Body>
									</Card>,
								'별점':
									<Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
										<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Star />
										</Card.Body>
									</Card>,
								'리커트':
									<Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
										<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Likertchart />
										</Card.Body>
									</Card>,
								'감정바':
									<Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
										<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Slider />
										</Card.Body>
									</Card>,
							}[savedQs['type']]
						)
					}
					)
				}
				{
					props.curSelectedType != 'Type' && props.curQs != '' ?
						{
							'주관식': <Card.Title className='basicCard' > Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>,
							'객관식':

								<Card className='basicCard'>

									<Card.Title>Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
									<Card>
										{
											props.curQsItemList.map(
												(curQsItem, idx) => <Card key={idx}>{idx + 1}. {curQsItem}
												</Card>
											)
										}
									</Card>
								</Card>,
							'별점':
								<>
									<Card.Title>Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
									<Star />
								</>,
							'리커트':
								<>
									<Card.Title>Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
									<Likertchart />
								</>,
							'감정바':
								<>
									<Card.Title>Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
									<Slider />
								</>,

						}[props.curSelectedType]
						: null
				}

			</Card>
		</>
	)
}

export { Preview }