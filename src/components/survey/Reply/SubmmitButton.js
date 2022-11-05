import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PostReply } from '../../../API/Survey/PostReply';
import { tokenState, userIdState, userState } from '../../../atom';

function SubmmitButton(props) {

  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  const reply = props.replys;
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);


  const example = {

    "answerDtos": [
      {
        "age": "string",
        "answer_contents": "string",
        "gender": "string",
        "question_order": 0,
        "user_id": 1
      }
    ],
    "survey_id": 3,
    "user_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJoZXlmb3JtIiwiZW1haWwiOiJUZXN0MSIsImlhdCI6MTY2NjkwODAwMywiZXhwIjoxNjY2OTExNjAzfQ.KG2-kJ7QJm93Bgx0GkV_aIVTr5ivxgHgfwn5Nazet8U"

  }

  let answerDtos = [];
  let resultReply = {};
  let answerDto = [];

  function click() {
    for (var i = 1; i < Object.keys(reply).length; i++) {
      answerDto[i-1] = {
        age: "string",
        answer_contents: reply[i].value,
        gender: "string",
        question_order: reply[i].idx-1 ,
        user_id: userId,
      }
    }
      answerDtos.push(answerDto[i]);
      resultReply = {

        answerDtos: answerDto,
        survey_id: props.surveyId,
        user_token: token,
      }

      console.log("RESUlT!!", JSON.stringify(resultReply));
      //console.log("djsda", JSON.stringify(example));
      PostReply(resultReply );

    }


    return (
      <>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Body style={{ textAlign: "center" }}>
            <br />
            <h3>소중한 답변 감사합니다 😊</h3>
            <h5>응답한 설문지는 워크스페이스에서 확인 가능합니다</h5>
            <br />
            <Button onClick={() => navigate('/main')}>확인</Button>
          </Modal.Body>
        </Modal>

        <br></br>
        <div className='submmitBtn' >
          <Button style={{ margin: "3%" }} type="submit"
            onClick={() => { { click(); setShow(true) } }}>
            제출
          </Button>
        </div>
      </>
    );

  }


  export { SubmmitButton };

