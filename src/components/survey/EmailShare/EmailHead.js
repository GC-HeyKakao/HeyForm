import React, { useCallback } from 'react';
import { RiCreativeCommonsSaLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';

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
  color: #0D6EFD;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

function EmailHead({todos,onDel}) {

  let count = 0;

  function SendEmail(email) {
  
    //alert(email);

    emailjs.init("QWLdVWHIWIdwz4wqd");
  
      //email-js 템플릿 파라미터
      var params = { 
        to_email: email,
        to_user_name: "박수빈",
        from_user_name: "헤이카카오",
        servey_link: "http://localhost:3000/servey",
      }

      emailjs.send(
        'service_qdtvd3j', 
          'template_1ruh25n', 
          params
          
      ).then((result) => {

        if(count==0)
        {
          alert("메일을 전송했습니다! 응답을 기다려보세요🥰")
        }
        
        count++;
  
      }, (error) => {
      });
}

  return (
    <>
    {console.log(todos)}
    <EmailHeadBlock>
      
    <br></br>
      <h1>이메일로 설문 요청</h1>
      <p></p>
      <div className="day">설문을 요청할 상대방의 이메일을 입력해주세요!</div>
      
      <Button style= {{margin:"3%"}} type="submit" 
            onClick={()=>{todos.map(todos=>{SendEmail(todos.text)})}}>
            발송
        </Button>
      <TasksLeft>총 {todos.length}명</TasksLeft>
    </EmailHeadBlock>

    </>
  );

}

export {EmailHead};
