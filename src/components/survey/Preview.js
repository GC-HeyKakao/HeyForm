import { Card, Form } from 'react-bootstrap';
import Likertchart from './Likertchart';
import Slider from './Slider';
import Star from './Star';
import './Preview.css';

//체크박스 체크 여부 확인
//체크여부에 따라서 체크된 항목 번호 리턴 (Alert로 표시)
function is_checked() {

	const Checkbox0 = document.getElementById(0);
	const Checkbox1 = document.getElementById(1);
	const Checkbox2 = document.getElementById(2);

	const is_checked0 = Checkbox0.checked;
	const is_checked1 = Checkbox1.checked;
	const is_checked2 = Checkbox2.checked;

	// alert(Checkbox0.value + is_checked0 + Checkbox1.value + is_checked1 + Checkbox2.value + is_checked2);
	//document.hetElementById('')

}

function Preview(props) {

	const category = props.category;
	let backgroundColor = 'white';
	let textColor = 'black';
	if (category == '운동') {
		backgroundColor = '#DEEBF7'
	}
	else if (category == '기본') {
		backgroundColor = '#F8F8FD';
	}
	else if (category == '환경') {
		backgroundColor = '#ACE383'
	}
	else if (category == '동물') {
		backgroundColor = '#FDEEF4';
	}
	else if (category == '정치') {
		backgroundColor = '#eee'
	}
	else if (category == '학교') {
		backgroundColor = '#fef5d4'
	}
	else if (category == '음악') {
		backgroundColor = '#EC67AD'
	}
	else if (category == '영화') {
		backgroundColor = '#272E56';
		textColor = 'white';
	}
	else if (category == '예술') {
		backgroundColor = '#7E354D'
		textColor = 'white';
	}
	else if (category == '게임') {
		backgroundColor = '#342D7E'
		textColor = 'white';
	}
	else if (category == '식사') {
		backgroundColor = '#FAEBD7'
	}
	else {
		backgroundColor = '#F8F8FD'
	}


	return (
		<>
			{/* <Card className='basicCard' style={{ padding: "3%", backgroundColor: backgroundColor, overflowY: "scroll", width: "auto", height: "580px" }}> */}
			<div className='right' style={{ padding: "3%", backgroundColor: backgroundColor, overflowY: "auto", width: "100%", height: "100%" }}>
				<h2 style={{ color: textColor, marginLeft: "8%", marginTop: "10%", textAlign: "left", fontWeight: "bold" }}>{props.surveyTitle}</h2>
				<h6 style={{ color: textColor, marginLeft: "10%", marginTop: "5%", marginBottom: "7%", textAlign: "left" }}>{props.surveyDescription}</h6>
				{
					props.savedQsList.map((savedQs, idx) => {
						return (
							{
								'단답식':
									// <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
									<Card className='basicCard' key={idx} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title style={{ marginTop: '10px', marginLeft: '10px' }}> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<input className="input-shortanswer form-control" size="sm" type="text" placeholder="답변을 입력해주세요."
												style={{ borderColor: backgroundColor }}
											/>
										</Card.Body>
									</Card>,
								'객관식':
									<Card className='basicCard' key={idx} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title style={{ marginTop: '10px', marginLeft: '10px' }}> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											{
												// savedQs['qsItemList'].map(
												// 	(qsItem, idx) => <Form.Check type="checkbox" id={idx} label={qsItem}/>
												// )
												savedQs['qsItemList'].map(
													((qsItem, idx) => <div key={idx}> <input className="form-check-input" id={idx} name={qsItem} type="checkbox" value={qsItem} onChange={(e) => is_checked()} disabled />  {qsItem} </div>
													))
											}
										</Card.Body>
									</Card>,
								'별점':
									<Card className='basicCard' key={idx} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title style={{ marginTop: '10px', marginLeft: '10px' }}> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Star value={0} />
										</Card.Body>
									</Card>,
								'리커트':
									<Card className='basicCard' key={idx} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title style={{ marginTop: '10px', marginLeft: '10px' }}> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Likertchart back='white' value={0} />
										</Card.Body>
									</Card>,
								'감정바':
									<Card className='basicCard' key={idx} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title style={{ marginTop: '10px', marginLeft: '10px' }}> Q{idx + 1}: {savedQs['qs']} </Card.Title>
										<Card.Body>
											<Slider value={0} category={props.category} />
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
							'단답식':
								<Card className='basicCard' key={"key"} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
									<Card.Title className='basicCard' > Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
									<Card.Body>
										<input className="input-shortanswer form-control" size="sm" type="text" placeholder="답변을 입력해주세요."
											style={{ borderColor: backgroundColor }}
										/>
									</Card.Body>
								</Card>,

							'객관식':
								<>
									<Card className='basicCard' key={"key"} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title className='basicCard' > Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
										<Card.Body>
											{
												props.curQsItemList.map(
													((curQsItem, idx) => <div key={idx}> <input className="form-check-input" id={idx} name={curQsItem} type="checkbox" value={curQsItem} />  {curQsItem} </div>
													))
											}
										</Card.Body>
									</Card>
								</>,
							'별점':
								<>
									<Card className='basicCard' key={"key"} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title className='basicCard' > Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
										<Card.Body>
											<Star value={0} />
										</Card.Body>
									</Card>
								</>,
							'리커트':
								<>
									<Card className='basicCard' key={"key"} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title className='basicCard' > Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
										<Card.Body>
											<Likertchart back='white' value={"0"} />
										</Card.Body>
									</Card>

								</>,
							'감정바':
								<>
									<Card className='basicCard' key={"key"} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
										<Card.Title className='basicCard' > Q{props.savedQsList.length + 1}: {props.curQs} </Card.Title>
										<Card.Body>
											<Slider value={"0"} category={props.category} />
										</Card.Body>
									</Card>
								</>,

						}[props.curSelectedType]
						: null
				}

			</div>
		</>
	)
}

export { Preview };
