import emailjs from 'emailjs-com';
import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from '../../../atom';

const EmailHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  
  padding-top: 10px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const TasksLeft = styled.div`
  color: #565e64;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

function EmailHead({ link, emails, onDel }) {

  let count = 0;
  const users = useRecoilValue(userState);
  const [show, setShow] = useState(false);

  function SendEmail(email) {

    //alert(email);

    emailjs.init("QWLdVWHIWIdwz4wqd");

    //email-js 템플릿 파라미터
    var params = {
      to_email: email,
      from_user_name: users.name,
      survey_link: link,
    }

    emailjs.send(
      'service_qdtvd3j',
      'template_1ruh25n',
      params

    ).then((result) => {

      if (count == 0) {
        // alert("메일을 전송했습니다! 응답을 기다려보세요🥰")
        setShow(true);
      }
      count++;

    }, (error) => {
    });
  }

  return (
    <>

      <EmailHeadBlock>

        <br></br>
        <h2>이메일로 설문 요청</h2>
        <p></p>
        <div className="day">설문 요청할 상대의 이메일을 입력해주세요 💌</div>
        <TasksLeft>총 {emails.length}명</TasksLeft>
        <Button variant='secondary' style={{ marginTop: "5%" }} type="submit"
          onClick={() => { { emails.map(emails => { SendEmail(emails.text) }); } }}>
          발송
        </Button>
      </EmailHeadBlock>


      <Modal show={show} onHide={() => { setShow(false); }} centerd>
        <Modal.Body style={{ textAlign: "center" }}>
          <br />
          <h4>이메일을 성공적으로 발송했습니다!<br></br></h4>
          <h5>응답을 기다려보세요🥰<br /></h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShow(false); }}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export { EmailHead };

