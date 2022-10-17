import { ShareSurvey } from "../Survey/ShareSurvey";
import { SubmmitButton } from "../Survey/Reply/SubmmitButton";
import { Card, Form } from 'react-bootstrap'
import Likertchart from '../Survey/Likertchart';
import Slider from '../Survey/Slider';
import Star from '../Survey/Star';
import { useParams } from "react-router-dom";

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
  
//워크스페이스용 설문지 확인js
function SurveyView(props)

{
  const surveyId = props.surveyId;
  // console.log(surveyId)
  const userId = window.localStorage.getItem('token');
  const createrId = window.localStorage.getItem("creater["+surveyId+"]");
  const savedQsList = JSON.parse(window.localStorage.getItem("savedQsList["+surveyId+"]"));
  const curQs = JSON.parse(window.localStorage.getItem("curQs["+surveyId+"]"));
  const curQsItemList = JSON.parse(window.localStorage.getItem("curQsItemList["+surveyId+"]"));
  const curSelectedType = JSON.parse(window.localStorage.getItem("curSelectedType["+surveyId+"]"));
  const surveyTitle = JSON.parse(window.localStorage.getItem("surveyTitle["+surveyId+"]"));
  const category = window.localStorage.getItem("category["+surveyId+"]")
  const shareWay = window.localStorage.getItem("shareWay["+surveyId+"]")

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
                      <Slider category={category} />
                    </Card.Body>
                  </Card>,
              }[savedQs['type']]
            )
          }
          )
        }
        {
          curSelectedType != 'Type' && curQs != '' ?
            {
              '단답식': <Card.Title className='basicCard' > Q{savedQsList.length + 1}: {curQs} </Card.Title>,
              '객관식':

                <Card className='basicCard'>

                  <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                  <Card>
                    {
                      curQsItemList.map(
                        ((curQsItem, idx) => <div key={idx}> <input className="form-check-input" id={idx} name={curQsItem} type="checkbox" value={curQsItem} />  {curQsItem} </div>
                        ))
                    }
                  </Card>
                </Card>,
              '별점':
                <>
                  <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                  <Star />
                </>,
              '리커트 척도':
                <>
                  <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                  <Likertchart />
                </>,
              '감정바':
                <>
                  <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                  <Card.Body>
                    <Slider category={category} />
                  </Card.Body>
                </>,

            }[curSelectedType]
            : null
        }

        {
          //설문 작성자면 설문지를 공유하는 <ShareSurvey /> 컴포넌트를, 작성자가 아니라면 응답을 제출할 수 있는 <SubmmitButton /> 컴포넌트를 보여줌.
          userId === createrId?
            <ShareSurvey shareWay={shareWay}/>

            :

          <>
          <SubmmitButton />
          </>
        }

      </Card>
    
  )
}

export { SurveyView }