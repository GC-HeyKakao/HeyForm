import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emailjs from 'emailjs-com';
import { Button, Modal } from 'react-bootstrap'
import { AskSubmitButton } from './AskSubmitButton';
import { userState } from '../../atom';
import { useRecoilValue } from 'recoil';
import "./WriteAsk.css";

function WriteAsk() {

  const user = useRecoilValue(userState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [askContent, setAskContent] = useState({
    "qa_answer": "",
    "qa_contents": content,
    "qa_title":title,
    "user_email": user.email,
  })

  useEffect(() => {

    setAskContent({
      ...askContent,
      qa_answer:user.email,
      qa_contents:content,
      qa_id:0,
      qa_title:title,
    })
    

  }, [ title, content]);

  useEffect(()=>{
    
  }, [askContent])

  const getValue = e => {
    const { name, value } = e.target;
    setTitle(value);

  };

  return (
    <>
      <div className="WriteAsk">
        <div className='form-wrapper'>
          <input className="title-input"
            type='text'
            placeholder='&nbsp;제목을 입력해주세요.'
            onChange={getValue}
            name='title'
            // onChange={(event) => {
            //   setAskTitle(event.target.value);
            //   console.log(askTitle);
            // }} 
            />
          <CKEditor
            editor={ClassicEditor}
            data="아래에 의견을 작성해주세요 🥰"
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(String(data));
            }}
          />
        </div>

        <AskSubmitButton askContent={askContent}/>
        {/* <form>
          <Button style={{ margin: "3%" }} onClick={handleButton}>
            발송
          </Button>
        </form> */}
      </div>
      {/* <Modal show={show} onHide={() => { setShow(false); }}>
        <Modal.Body style={{ textAlign: "center" }}>
          <br />
          <h4>소중한 의견 감사합니다😍</h4>
          <br />
          
          <Button onClick={() => { setShow(false); }}>확인</Button>
        </Modal.Body>
      </Modal> */}
    </>

  )
}

export { WriteAsk }