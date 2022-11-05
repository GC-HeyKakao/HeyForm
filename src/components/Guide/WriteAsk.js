
import React, { useCallback, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emailjs from 'emailjs-com';
import { Button, Modal } from 'react-bootstrap'
import "./WriteAsk.css";

function WriteAsk() {

  const [show, setShow] = useState(false);
  const submitForm = document.querySelector("#subscribe");
  const [askTitle, setAskTitle] = useState('');
  const [askContent, setAskContent] = useState('');
  //email 보내기

  function submitAsk() {

  }

  function handleButton() {
    submitAsk(askTitle + askContent);
    setShow(true);
  }

  return (
    <>
      <div className="WriteAsk">
        <div className='form-wrapper'>
          <input className="title-input"
            type='text'
            placeholder='제목을 입력해주세요.'
            //onChange={getValue}
            name='title'
            onChange={(event) => {
              setAskTitle(event.target.value);
              console.log(askTitle);
            }} />
          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setAskContent(data);
              console.log(askContent);
            }}
          />
        </div>
        <form>
          <Button style={{ margin: "3%" }} type="submit" onClick={handleButton}>
            발송
          </Button>
        </form>
      </div>
      <Modal show={show} onHide={() => { setShow(false); }}>
        <Modal.Body style={{ textAlign: "center" }}>
          <br />
          <h4>소중한 의견 감사합니다😍</h4>
          <br />
          {/* 설문 josn post하기 */}
          <Button onClick={() => { setShow(false) }}>확인</Button>
        </Modal.Body>
      </Modal>
    </>

  )
}

export { WriteAsk }