import { useState, useRef, useEffect } from 'react'
import { Form, Button, InputGroup, CloseButton } from 'react-bootstrap'
import { DropdownCmpt } from '../DropdownCmpt'
import Star from './Star';
import Likertchart from './Likertchart';
import Slider from './Slider';

function WriteSurvey(props) {
	let surveyTypeList = ["주관식", "객관식", "별점", "리커트", "감정바"];
	let [selectedType, setSelectedType] = useState('Type');
	let [qsItemList, setQsItemList] = useState([]);
	let [qs, setQs] = useState('');
	let [star, setStar] = useState(5);

	useEffect(() => {
		setQs('')
		setQsItemList([]);
		props.setCurSelectedType(selectedType);
	}, [selectedType])

	// console.log("qs: " + qs+ " listt: " + qsItemList)

	return (
		<div style={{ padding: "2%", paddingTop: "5%" }}>
			<DropdownCmpt list={surveyTypeList} title={selectedType}
				style={{ paddingBottom: "1%" }} setSelected={setSelectedType} defaultTitle="Type" />
			{
				{
					"주관식":
						<Form.Control size="sm" type="text" placeholder="질문을 입력하세요" onChange={(e) => {
							setQs(e.target.value);
							props.setCurQs(e.target.value);
						}} />,
					"객관식":
						<>
							<InputGroup>
								<InputGroup.Radio checked={false}
									onChange={(e) => {
										if (e.target.checked == true) {
											let copy = [...qsItemList, ''];
											setQsItemList(copy);
											props.setCurQsItemList(copy);
										}
									}} />
								<Form.Control placeholder="질문을 입력하세요"
									onChange={(e) => {
										setQs(e.target.value);
										props.setCurQs(e.target.value);
									}} />
							</InputGroup>
							{
								qsItemList.map((choice, idx) => {
									return (
										<InputGroup key={idx}>
											<InputGroup.Radio checked={true} onChange={(e) => {
												if (e.target.checked == true) { }
											}} />
											<Form.Control
												onChange={(e) => {
													let copy = [...qsItemList];
													copy[idx] = e.target.value;
													setQsItemList(copy);
													props.setCurQsItemList(copy);
												}}
												value={choice} />
											<CloseButton onClick={() => {
												let copy = [...qsItemList];
												copy.splice(idx, 1);
												setQsItemList(copy);
												props.setCurQsItemList(copy);
											}} />
										</InputGroup>
									)
								})
							}
						</>,
					"별점":
						<>
							<Form.Control size="sm" type="text" placeholder="질문을 입력하세요" onChange={(e) => {
								setQs(e.target.value);
								props.setCurQs(e.target.value);
							}} />
							<Star/>
						</>,
					"리커트":
						<>
							<Form.Control size="sm" type="text" placeholder="질문을 입력하세요" onChange={(e) => {
								setQs(e.target.value);
								props.setCurQs(e.target.value);
							}} />
							<Likertchart />
						</>,
					"감정바":
						<>
							<Form.Control size="sm" type="text" placeholder="질문을 입력하세요" onChange={(e) => {
								setQs(e.target.value);
								props.setCurQs(e.target.value);
							}} />
							<Slider />
						</>,
				}[selectedType]
			}
			<br />
			<Button variant="primary" style={{ marginLeft: "43.7%" }}
				onClick={() => {
					if (qs != '') {
						let copy = [...props.savedQsList];
						copy.push({ type: selectedType, qs: qs, qsItemList: qsItemList })
						props.setSavedQsList(copy);
						setSelectedType('Type');
						props.setMakeQsSwitch(false);
					}
				}}>추가</Button>{' '}
		</div>
	)
}

export { WriteSurvey };