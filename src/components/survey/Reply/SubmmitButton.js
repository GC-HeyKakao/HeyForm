import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PostReply } from '../../../API/Survey/PostReply';
import { userState } from '../../../atom';

// {"user_token":"Token","survey_id": 1,"answerDtos":[{"question_order":1,"answer_contents":"testansewr1"}]}

function SubmmitButton(props) {

  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  const reply = props.replys;
  console.log("reply!!!", reply)
  //console.log("reply", JSON.stringify(reply));
  const user = useRecoilValue(userState);
  const token = user.token;
  const userId = user.id;

  //날짜 지정
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let nextMonth = ('0' + (today.getMonth() + 2)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2);
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2);

  let dateString = year + '-' + month + '-' + day;
  let timeString = hours + ':' + minutes;
  let nextDateString = year + '-' + nextMonth + '-' + day;
  let current_time_temp = dateString + ' ' + timeString + ':' + seconds;

  const [answerDtos, setAnswerDtos] = useState([]);
  let resultReply = {};
  let answerDto = [];

  function click() {

    for (var i = 1; i <= Object.keys(reply).length; i++) {

      console.log(reply);
      console.log(i, reply[i].value);
      console.log(Object.keys(reply).length);

      answerDto[i - 1] = {
        answer_contents: reply[i].value,
        answer_time: current_time_temp,
        question_order: reply[i].idx - 1,

      }


      console.log("reply1", answerDto[i - 1]);
      answerDtos.push(answerDto[i - 1]);
    }
    setAnswerDtos(answerDtos);
    console.log("reply?", answerDtos);

    resultReply = {

      answerDtos: answerDtos,
      survey_id: props.surveyId,
      user_age: user.age,
      user_gender: user.gender,
      user_id: user.id,
      user_token: token,
    }

    console.log("RESUlT!!", JSON.stringify(resultReply));
    //console.log("djsda", JSON.stringify(example));
    PostReply(resultReply);

  }


  return (
    <>
      <Modal show={show} onHide={() => { setShow(false) }}  >
        <Modal.Body style={{ textAlign: "center" }}>
          <br />
          <h3>소중한 답변 감사합니다 😊</h3>
          <br />
          <h5>응답한 설문지는 <br />워크스페이스에서 확인 가능합니다 📮</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => navigate('/main')}>확인</Button>
        </Modal.Footer>
      </Modal>

      <br></br>
      <div style={{ textAlign: 'center' }} >
        <Button variant='secondary' style={{ margin: "3%" }} type="submit"
          onClick={() => { { click(); setShow(true) } }}>
          제출
        </Button>
      </div>
    </>
  );

}


export { SubmmitButton };

