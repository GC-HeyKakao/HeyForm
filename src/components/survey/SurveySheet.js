import { Preview } from "./Preview";
import { ShareSurvey } from "./ShareSurvey";
import { SubmmitButton } from "./Reply/SubmmitButton";
import { Card, Form, Col, Row, Input } from 'react-bootstrap'
import Likertchart from './Likertchart';
import Slider from './Slider';
import Star from './Star';
import { useParams } from "react-router-dom";
import { useState } from "react"

var ckAnswer = new Array();

//체크박스 체크 여부 확인
//체크여부에 따라서 체크된 항목 번호 리턴 (Alert로 표시)
function is_checked(type, idx, ItemIdx) {

  var Checkbox = new Array();
  var is_checked = new Array();
	Checkbox[ItemIdx] = document.getElementById(ItemIdx);
  is_checked[ItemIdx] = Checkbox[ItemIdx].checked;
  

  if(is_checked[ItemIdx]==true)
  {
    ckAnswer.push(ItemIdx);
    
  }
  else{
    var index = ckAnswer.indexOf(ItemIdx);
    ckAnswer.splice(index,1);
  }

  console.log('type : ' + type + ', idx : ' + idx + ', value : ' + ckAnswer);


	//document.hetElementById('')


}
  
//완성된 설문지를 확인해보기 위한 js
function SurveySheet()

{

  function OnKey(type, idx, e) {
    var value = e.target.value;
    console.log('type : ' + type + ', idx : ' + idx + ', value : ' + value);
}

  const { surveyId } = useParams();
  // console.log(surveyId)
  const userId = window.localStorage.getItem('token');
  const createrId = window.localStorage.getItem("creater["+surveyId+"]");
  const savedQsList = JSON.parse(window.localStorage.getItem("savedQsList["+surveyId+"]"));
  const surveyTitle = JSON.parse(window.localStorage.getItem("surveyTitle["+surveyId+"]"));
  const category = window.localStorage.getItem("category["+surveyId+"]")
  const shareWay = window.localStorage.getItem("shareWay["+surveyId+"]")
  let [savedAsList, setSavedAsList] = useState([]);

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

       <Card className='basicCard' style={{ padding: "3%", backgroundColor:backgroundColor }}>
        <h2 style={{ marginBottom: "3%", textAlign:"center" }}>{surveyTitle}</h2>
        {
          savedQsList.map((savedQs, idx) => {
            return (
              {
                '단답식':
                  // <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
                  <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
            
                    <Card.Body>
                      <div>
                      <Form.Control id="answer" onKeyUp={e=>{OnKey("단답식", idx+1, e)}} size="sm" type="text" placeholder="답변을 입력해주세요."/>
                      </div>
                      {/* <Form.Control id="answer" size="sm" type="text" placeholder="답변을 입력해주세요."/> */}
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
                          ((qsItem, ItemIdx) => <div key={ItemIdx}> <input className="form-check-input" id={ItemIdx} name={qsItem} type="checkbox" value={qsItem} onChange={(e) => is_checked("객관식", idx+1, ItemIdx)} />  {qsItem} </div>
                          ))
                      }
                    </Card.Body>
                  </Card>,
                '별점':
                  <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                    <Card.Body>
                      <Star idx={idx+1}/>
                    </Card.Body>
                  </Card>,
                '리커트':
                  <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                    <Card.Body>
                      <Likertchart idx={idx+1}/>
                    </Card.Body>
                  </Card>,
                '감정바':
                  <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                    <Card.Body>
                      <Slider category={category} idx={idx+1}/>
                    </Card.Body>
                  </Card>,
              }[savedQs['type']]
            )
          }
          )
        }
        

        {
          //설문 작성자면 설문지를 공유하는 <ShareSurvey /> 컴포넌트를, 작성자가 아니라면 응답을 제출할 수 있는 <SubmmitButton /> 컴포넌트를 보여줌.
          userId === createrId?
            <ShareSurvey shareWay={shareWay}/>

            :

          <>
          <SubmmitButton surveyId={surveyId}/>
          </>
        }

      </Card>
    
  )
}

export { SurveySheet }