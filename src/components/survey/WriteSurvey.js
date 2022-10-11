import { useState, useRef, useEffect } from 'react'
import {Form, Button, InputGroup, CloseButton} from 'react-bootstrap'
import {DropdownCmpt} from '../Guide/DropdownCmpt'

function WriteSurvey(props) {
	let surveyTypeList = ["주관식", "객관식", "선형배율", "등급(별점)", "리커트", "신뢰도 측정"];
	let [selectedType, setSelectedType] = useState('Type');
	let [qsItemList, setQsItemList] = useState([]);
	let [qs, setQs] = useState('');
	
	useEffect(()=>{
		setQs('')
		setQsItemList([]);
		props.setCurSelectedType(selectedType);
	}, [selectedType])

	// console.log("qs: " + qs+ " listt: " + qsItemList)

	return (
		<div style={{padding:"2%", paddingTop:"5%"}}>
			<DropdownCmpt list={surveyTypeList} title={selectedType} 
				style={{paddingBottom: "1%"}} setSelected={setSelectedType} defaultTitle="Type"/>
			{
				{
					"주관식": 
						<Form.Control size="sm" type="text" placeholder="주관식 설문" onChange={(e)=>{
							setQs(e.target.value);
							props.setCurQs(e.target.value);
						}}/>,
					"객관식": 
						<>
							<InputGroup>
								<InputGroup.Radio checked={false}
									onChange={(e)=>{
										if (e.target.checked == true){
											let copy = [...qsItemList, ''];
											setQsItemList(copy);
											props.setCurQsItemList(copy);
										}
									}}/>
								<Form.Control
									onChange={(e)=>{
										setQs(e.target.value);
										props.setCurQs(e.target.value);
									}}/>
							</InputGroup>
							{
								qsItemList.map((choice, idx)=>{
									return(
										<InputGroup key={idx}>
											<InputGroup.Radio checked={false} onChange={(e)=>{
												if(e.target.checked == true) {}
											}}/>
											<Form.Control 
												onChange={(e)=>{
													let copy = [...qsItemList];
													copy[idx] = e.target.value;
													setQsItemList(copy);
													props.setCurQsItemList(copy);
												}} 
												value={choice}/> 
											<CloseButton onClick={()=>{
												let copy = [...qsItemList];
												copy.splice(idx, 1);
												setQsItemList(copy);
												props.setCurQsItemList(copy);
											}}/> 
										</InputGroup>
									)
								})
							}
						</>,
				
				}[selectedType]
			}
			<br/>
			<Button variant="primary" style={{marginLeft: "43.7%"}}
				onClick={()=>{
					if(qs != '') {
						let copy = [...props.savedQsList];
						copy.push({type: selectedType, qs: qs, qsItemList: qsItemList})
						props.setSavedQsList(copy);
						setSelectedType('Type');
						props.setMakeQsSwitch(false);
					}
				}}>추가</Button>{' '}
		</div>
	)
}

export {WriteSurvey};