import { useEffect, useState } from "react";
import { Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CreateSurveyByURL } from "../../API/Survey/CreateSurveyByURL";
import { replyState } from "../../atom";
import Likertchart from './Likertchart';
import { SubmmitButton } from "./Reply/SubmmitButton";
import { ShareSurvey } from "./ShareSurvey";
import Slider from './Slider';
import Star from './Star';

var ckAnswer = new Array();

//완성된 설문지를 확인해보기 위한 js
function SurveySheet() {

  const { surveyId } = useParams();
  console.log('surveyid', surveyId)
  console.log("SurveySheet 시작");
  const navigate = useNavigate();

  let dto = null;
  let replys = useRecoilValue(replyState);
  let replyHandler = useSetRecoilState(replyState);
  let copy = [...replys];
  const [surveyTitle, setTitle] = useState("title");
  const [category, setCategory] = useState([]);
  const [savedQsList, setSavedQsList] = useState([]);
  const [surveyDes, setDes] = useState([]);
  const [surveyStartTime, setSurveyStartTime] = useState([]);
  const [surveyEndTime, setSurveyEndTime] = useState([]);
  const [survey_id, setId] = useState();

  function getKeyByValue(obj, value) {
    console.log(obj);
    return Object.keys(obj).find(key => obj[key] === value);
  }


  useEffect(() => {

    //url을 넘겨줘서 설문 dto 가져옴. 이거 파싱해서 설문지 생성할거임
    CreateSurveyByURL(surveyId)
      .then((res) => {
        dto = res;
        setTitle(dto.surveyDto.survey_title);
        setCategory(dto.surveyDto.category);
        setSavedQsList(dto.questionDtos);
        setDes(dto.surveyDto.description);
        setId(dto.surveyDto.survey_id);
        setSurveyStartTime(dto.surveyDto.start_time);
        setSurveyEndTime(dto.surveyDto.end_time);

      }, (err) => console.log(err))

  }, [replys]);


  function OnKey(type, idx, e) {

    var value = e.target.value;

    console.log(replys);
    copy[idx] = {
      surveyId: surveyId,
      type: type,
      idx: idx,
      value: value,

    }

    replyHandler(copy);

  }

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
    console.log("copy", copy);
    replyHandler(copy);

  }

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
      <Card className='basicCard' style={{ padding: "3%", backgroundColor: backgroundColor }}>
        <h2 style={{ marginBottom: "3%", textAlign: "center" }}>{surveyTitle}</h2>
        <h6 style={{ marginBottom: "5%", textAlign: "center" }}>{surveyDes}</h6>
        {
          console.log("map", savedQsList)}
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
                        // savedQs['qsItemList'].map(
                        //    (qsItem, idx) => <Form.Check type="checkbox" id={idx} label={qsItem}/>
                        // )
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
          // getKeyByValue(Object.keys(window.localStorage), surveyId) !== undefined ?
          (Object.keys(window.localStorage)).indexOf(surveyId) !== -1 ?
            <ShareSurvey
              surveyTitle={surveyTitle}
              surveyDescription={surveyDes}
              start_time={surveyStartTime}
              end_time={surveyEndTime}
              shareWay={window.localStorage.getItem(surveyId)} />

            :

            <>
              <SubmmitButton replys={replys} surveyId={surveyId} />
            </>
        }

      </Card>
    </>

  )
}

export { SurveySheet };
