import { useEffect } from 'react';
import { Card, Form, Col, Row, Input } from 'react-bootstrap'
import { resultingClientExists } from 'workbox-core/_private';
import Likertchart from './Likertchart';
import Slider from './Slider';
import Star from './Star';

//체크박스 체크 여부 확인
//체크여부에 따라서 체크된 항목 번호 리턴 (Alert로 표시)
function is_checked() {

	const Checkbox0 = document.getElementById(0);
	const Checkbox1 = document.getElementById(1);
	const Checkbox2 = document.getElementById(2);

	const is_checked0 = Checkbox0.checked;
	const is_checked1 = Checkbox1.checked;
	const is_checked2 = Checkbox2.checked;

	alert(Checkbox0.value + is_checked0 + Checkbox1.value + is_checked1 + Checkbox2.value + is_checked2);
	//document.hetElementById('')


}

function Preview(props) {
	// console.log("qs: " + props.curQs + " list: " + props.curQsItemList)

	const category = props.category;
	console.log(category);
	let backgroundColor = 'white';
	if (category == '운동') {
		backgroundColor = '#DEEBF7'
	} else if (category == '만족도') {
		backgroundColor = '#FFE5EB';
	}
	else if (category == '환경') {
		backgroundColor = '#E2F0D9'
	}
	return (
		<>
			 <Card className='basicCard' style={{ padding: "3%", backgroundColor:backgroundColor }}>
				<h2 style={{ marginBottom: "3%", textAlign:"center" }}>{props.surveyTitle}</h2>
				{
					props.savedQsList.map((savedQs, idx) => {
						return (
							{
								'단답식':
									// <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
									<Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
										<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Form.Control size="sm" type="text" placeholder="답변을 입력해주세요."
											/>
										</Card.Body>
									</Card>,
								'객관식':
									<Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
										<Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											{
												// savedQs['qsItemList'].map(
												// 	(qsItem, idx) => <Form.Check type="checkbox" id={idx} label={qsItem}/>
												// )
												savedQs['qsItemList'].map(
													((qsItem, idx) => <div key={idx}> <input className="form-check-input" id={idx} name={qsItem} type="checkbox" value={qsItem} onChange={(e) => is_checked()} />  {qsItem} </div>
													))
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
											<Slider category={props.category} />
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
							'단답식': <Card.Title className='basicCard' > Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>,
							'객관식':

								<Card className='basicCard'>

									<Card.Title>Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
									<Card>
										{
											props.curQsItemList.map(
												((curQsItem, idx) => <div key={idx}> <input className="form-check-input" id={idx} name={curQsItem} type="checkbox" value={curQsItem} />  {curQsItem} </div>
												))
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
									<Card.Body>
										<Slider category={props.category} />
									</Card.Body>
								</>,

						}[props.curSelectedType]
						: null
				}

			</Card>
			<div></div>
		</>
	)
}

export { Preview }