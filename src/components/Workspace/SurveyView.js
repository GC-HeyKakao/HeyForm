import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Likertchart from '../Survey/Likertchart';
import { ShareSurvey } from "../Survey/ShareSurvey";
import Slider from '../Survey/Slider';
import Star from '../Survey/Star';
import '../../components/Survey/Preview.css'


var ckAnswer = new Array();

//워크스페이스용 설문지 확인js
function SurveyView(props) {
  const { surveyId } = "useParams()";

  const [surveyTitle, setTitle] = useState('');
  const [surveyDes, setDes] = useState('');
  const [category, setCategory] = useState([]);
  const [savedQsList, setSavedQsList] = useState([]);
  let shareWay = window.localStorage.getItem("shareWay[" + 1 + "]")
  let [survey_id, setId] = useState();

  useEffect(() => {
    console.log(props);
    setTitle(props.surveyQuestionDto.surveyDto.survey_title);
    setCategory(props.surveyQuestionDto.surveyDto.category);
    setSavedQsList(props.surveyQuestionDto.questionDtos);
    setDes(props.surveyQuestionDto.surveyDto.description);
    setId(props.surveyQuestionDto.surveyDto.survey_id);
  }, [props]);


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
      <Card className='basicCard' style={{ marginTop: "20px", padding: "3%", backgroundColor: backgroundColor, border: "none", overflowY: "auto", width: "100%", height: "100%" }}>
        <p className='h1' style={{ color: textColor, marginLeft: "10%", marginRight: "10%", marginTop: "7%", textAlign: "left", fontWeight: "bold" }}>{surveyTitle}</p>
        <p className='h4' style={{ color: textColor, marginLeft: "10%", marginRight: "10%", marginTop: "2%", marginBottom: "5%", textAlign: "left" }}>{surveyDes}</p>
        {
          savedQsList && savedQsList.map((item) => {
            return (

              {
                '단답식':
                  // <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title style={{ marginTop: "10px", }}> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <input className="input-shortanswer form-control" size="sm" type="text" placeholder="답변을 입력해주세요."
                        style={{ borderColor: backgroundColor }} />
                      {/* <Form.Control id="answer" size="sm" 
                      type="text" placeholder="답변을 입력해주세요."/> */}
                    </Card.Body>
                  </Card>,
                '객관식':
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      {
                        item['choiceDtos'].map(
                          ((choice) => <div key={choice['choice_order']}> <input className="form-check-input" id={choice['choice_order']} name={choice['choice_contents']} type="checkbox" value={choice['choice_contents']} disabled />  {choice['choice_contents']} </div>
                          ))
                      }
                    </Card.Body>
                  </Card>,
                '별점':
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <Star value={"0"} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,
                '리커트':
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <Likertchart back='white' value={""} idx={item['question_order'] + 1} surveyId={surveyId} />
                    </Card.Body>
                  </Card>,
                '감정바':
                  <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                    <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                    <Card.Body>
                      <Slider category={category} value={"0"} idx={item['question_order'] + 1} surveyId={surveyId} />
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
            surveyDescription={props.surveyQuestionDto.surveyDto.description}
            start_time={props.surveyQuestionDto.surveyDto.start_time}
            end_time={props.surveyQuestionDto.surveyDto.end_time}
            shareWay={"workSpace"}
            link={props.link} />
        }

      </Card>

    </>

  )
}

export { SurveyView };

