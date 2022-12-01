import { useEffect, useState } from "react";
import { Card, Form } from 'react-bootstrap';
import { useLocation, useParams } from "react-router-dom";
import { CreateSurveyByURL } from "../../API/Survey/CreateSurveyByURL";
import Likertchart from './Likertchart';
import Slider from './Slider';
import Star from './Star';
import { SurveyFooter } from "./SurveyFooter";
import { MultipleChoice } from "./MultipleChoice";
import { ShortAnswer } from "./ShortAnswer";
import '../../components/Survey/Preview.css'


var ckAnswer = new Array();

//완성된 설문지를 확인해보기 위한 js
function SurveySheet(props) {

  const { surveyId } = useParams();
  let { state } = useLocation();
  
  console.log("shareWay", state);
  if(state==null){
    state="respondent";
  }
  console.log('surveyid', surveyId)
  console.log("SurveySheet 시작");

  let dto = null;
  let dtoJson = null;
  // let replys = useRecoilValue(replyState);
  // let replyHandler = useSetRecoilState(replyState);
  let [replys, replyHandler] = useState([]);
  let copy = [...replys];
  const [surveyTitle, setTitle] = useState("title");
  const [category, setCategory] = useState([]);
  const [savedQsList, setSavedQsList] = useState([]);
  const [surveyDes, setDes] = useState([]);
  const [surveyStartTime, setSurveyStartTime] = useState([]);
  const [surveyEndTime, setSurveyEndTime] = useState([]);
  const [survey_id, setId] = useState();
  const [starValue, starHandler] = useState(0);
  const [likertValue, likertHandler] = useState(0);
  const [sliderValue, sliderHandler] = useState(0);

  function getKeyByValue(obj, value) {
    console.log(obj);
    return Object.keys(obj).find(key => obj[key] === value);
  }

  useEffect(() => {

    //url을 넘겨줘서 설문 dto 가져옴. 이거 파싱해서 설문지 생성할거임
    CreateSurveyByURL(surveyId)
      .then((res) => {
        dto = res;
        dtoJson = JSON.stringify(dto);
        console.log(dto);
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


    console.log("객관식?", replys);
    if (is_checked[ItemIdx] == true) {
      ckAnswer[ItemIdx]="checked";
      console.log("check", ItemIdx);
    }
    else {
      ckAnswer[ItemIdx]="";
      //ckAnswer.push("unchecked");
    }

    let str = ckAnswer.join(" ");
    //alert(str);

    copy[idx] = {
      surveyId: surveyId,
      type: type,
      idx: idx,
      value: str,
    }
    const arr = str.split(" ");
    //console.log("Arr", arr);
    //console.log("copy", copy);
    replyHandler(copy);

  }

  console.log(category);
  let backgroundColor = 'white';
  if (category == '운동') {
    backgroundColor = '#DEEBF7'
  } else if (category == '만족') {
    backgroundColor = '#FFE5EB';
  }
  else if (category == '환경') {
    backgroundColor = '#E2F0D9'
  }
  else if (category == '정치') {
    backgroundColor = '#eee'
  }
  else if (category == '학교') {
    backgroundColor = '#fef5d4'
  }

  return (
    <>
      <Card className='basicCard' style={{ padding: "3%", backgroundColor: backgroundColor, border:"none" }}>
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
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <div>
                        {/* <Form.Control id="answer" onKeyUp={e => { OnKey("단답식", item['question_order'] + 1, e) }} type="text" placeholder="답변을 입력해주세요." /> */}
                        <ShortAnswer backgroundColor={backgroundColor} replys={replys} item={item} replyHandler={replyHandler} surveyId={surveyId}></ShortAnswer>
                      </div>
                    </Card.Body>
                  </Card>,
                '객관식':
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                  {
                        <MultipleChoice replys={replys} item={item} replyHandler={replyHandler} surveyId={surveyId}></MultipleChoice>
                      }
                    </Card.Body>
                  </Card>,
                '별점':
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <Star replys={replys} replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,
                '리커트':
                <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                  <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                  <Card.Body>
                    <Likertchart back='white' replys={replys} replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,
                '감정바':
                <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                  <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                  <Card.Body>
                    <Slider replys={replys} category={category} replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,

              }[item['question_type']]
            )
          }
          )
        }
        {

            <SurveyFooter 
                surveyUrl={ surveyId } 
                surveyTitle={surveyTitle}
                surveyDescription={surveyDes}
                start_time={surveyStartTime}
                end_time={surveyEndTime}
                replys={replys} 
                surveyId={survey_id} 
                shareWay={ state } />

          
          //설문 작성자면 설문지를 공유하는 <ShareSurvey /> 컴포넌트를, 작성자가 아니라면 응답을 제출할 수 있는 <SubmmitButton /> 컴포넌트를 보여줌.
          // getKeyByValue(Object.keys(window.localStorage), surveyId) !== undefined ?
          // (Object.keys(window.localStorage)).indexOf(surveyId) !== -1 ?
          //   <ShareSurvey
          //     surveyTitle={surveyTitle}
          //     surveyDescription={surveyDes}
          //     start_time={surveyStartTime}
          //     end_time={surveyEndTime}
          //     shareWay={window.localStorage.getItem(surveyId)} />

          //   :

          //   <>
          //     <SubmmitButton replys={replys} surveyId={surveyId} />
          //   </>

            
        }

      </Card>
    </>

  )
}

export { SurveySheet };

