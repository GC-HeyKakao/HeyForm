import { useEffect } from 'react';
import {Card} from 'react-bootstrap'

function ResultSurvey(props) {
	// console.log("qs: " + props.curQs + " list: " + props.curQsItemList)
	return(
		<>
			<h4 style={{marginBottom: "3%"}}>{props.surveyTitle}</h4>
			{
				props.savedQsList.map((savedQs, idx)=>
					{
						return(
							{
								'주관식': 
									// <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
									<Card className='basicCard' key={idx} style={{marginBottom: "3%"}}>
										<Card.Title> Q{idx+1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Card>답변</Card>
										</Card.Body>
									</Card>,
								'객관식': 
									<Card className='basicCard' key={idx} style={{marginBottom: "3%"}}>
										<Card.Title> Q{idx+1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											{
												savedQs['qsItemList'].map(
													(qsItem, idx)=><Card key={idx}>{idx+1}. {qsItem}</Card>
												)
											}
										</Card.Body>
									</Card>
							}[savedQs['type']]
						)
					}
				)
			}
			{
				props.curSelectedType!= 'Type' && props.curQs != ''?
				{
					'주관식': <Card.Title className='basicCard' > Q{props.savedQsList.length+1}: {props.curQs} </Card.Title>,
					'객관식': 
						<Card className='basicCard'>
							<Card.Title>Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
							<Card.Body>
								{
									props.curQsItemList.map(
										(curQsItem, idx)=><Card key={idx}>{idx+1}. {curQsItem}</Card>
									)
								}
							</Card.Body>
						</Card>
				}[props.curSelectedType]
				:null
			}
		</>
	)
}

export {ResultSurvey};