import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { replyState } from "../../atom";
import Likertchart from '../Survey/Likertchart';
import { ShareSurvey } from "../Survey/ShareSurvey";
import Slider from '../Survey/Slider';
import Star from '../Survey/Star';

var ckAnswer = new Array();

//워크스페이스용 설문지 확인js
function SurveyView(props) {
  const { surveyId } = "useParams()";

  let dtoJson = null;
  let replys = useRecoilValue(replyState);
  let replyHandler = useSetRecoilState(replyState);
  let copy = [...replys];
  const [surveyTitle, setTitle] = useState('');
  const [surveyDes, setDes] = useState('');
  const [category, setCategory] = useState([]);
  const [savedQsList, setSavedQsList] = useState([]);
  let shareWay = window.localStorage.getItem("shareWay[" + 1 + "]")
  let [survey_id, setId] = useState();

  useEffect(() => {
    setTitle(props.surveyQuestionDto.surveyDto.survey_title);
    setCategory(props.surveyQuestionDto.surveyDto.category);
    setSavedQsList(props.surveyQuestionDto.questionDtos);
    setDes(props.surveyQuestionDto.surveyDto.description);
    setId(props.surveyQuestionDto.surveyDto.survey_id);
  }, [props]);


  //체크박스 체크 여부 확인
  //체크여부에 따라서 체크된 항목 번호 리턴 (Alert로 표시)
  function is_checked(type, idx, ItemIdx) {

    var Checkbox = new Array();
    var is_checked = new Array();
    Checkbox[ItemIdx] = document.getElementById(ItemIdx);
    is_checked[ItemIdx] = Checkbox[ItemIdx].checked;


    if (is_checked[ItemIdx] == true) {
      ckAnswer.push(ItemIdx);

    }
    else {
      var index = ckAnswer.indexOf(ItemIdx);
      ckAnswer.splice(index, 1);
    }

    let str = ckAnswer.join();
    alert(str);

    copy[idx] = {
      surveyId: surveyId,
      type: type,
      idx: idx,
      value: str,
    }
    // console.log("copy", copy);
    replyHandler(copy);

  }

  function OnKey(type, idx, e) {

    var value = e.target.value;

    // console.log(replys);
    copy[idx] = {
      surveyId: surveyId,
      type: type,
      idx: idx,
      value: value,

    }

    replyHandler(copy);

  }

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
      <Card className='basicCard' style={{ padding: "3%", backgroundColor: backgroundColor }}>
        <h2 style={{ marginBottom: "3%", textAlign: "center" }}>{surveyTitle}</h2>
        <h6 style={{ marginBottom: "5%", textAlign: "center" }}>{surveyDes}</h6>
        {
          savedQsList && savedQsList.map((item) => {
            return (

              {
                '단답식':
                  // <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
                  <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>

                    <Card.Body>
                      <div>
                        <Form.Control id="answer" onKeyUp={e => { OnKey("단답식", item['question_order'] + 1, e) }} type="text" placeholder="답변을 입력해주세요." />
                      </div>
                      {/* <Form.Control id="answer" size="sm" 
                      type="text" placeholder="답변을 입력해주세요."/> */}
                    </Card.Body>
                  </Card>,
                '객관식':
                  <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      {
                        item['choiceDtos'].map(
                          ((choice) => <div key={choice['choice_order']}> <input className="form-check-input" id={choice['choice_order']} name={choice['choice_contents']} type="checkbox" value={choice['choice_contents']} onChange={(e) => is_checked("객관식", item['question_order'] + 1, choice['choice_order'])} />  {choice['choice_contents']} </div>
                          ))
                      }
                    </Card.Body>
                  </Card>,
                '별점':
                  <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <Star replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,
                '리커트':
                  <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <Likertchart replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,
                '감정바':
                  <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <Slider category={category} replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,

              }[item['question_type']]
            )
          }
          )
        }

        {
          //설문 작성자면 설문지를 공유하는 <ShareSurvey /> 컴포넌트를, 작성자가 아니라면 응답을 제출할 수 있는 <SubmmitButton /> 컴포넌트를 보여줌.

          <ShareSurvey
            surveyTitle={props.surveyQuestionDto.surveyDto.survey_title}
            surveyDescription={props.surveyQuestionDto}
            start_time={props.surveyQuestionDto.start_time}
            end_time={props.surveyQuestionDto.end_time}
            shareWay={localStorage[surveyId]} />
        }

      </Card>

    </>

  )
}

export { SurveyView };
