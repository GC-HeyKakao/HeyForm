
import React, { useCallback, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Modal } from 'react-bootstrap'
import { PostQA } from '../../API/QA/PostQA';
import "./WriteAsk.css";

function AskSubmitButton(props) {

  const [show, setShow] = useState(false);

  //email 보내기
  const onSubmit = useCallback((e) => {

    console.log("content", props.askContent)
    PostQA(props.askContent);
    setShow(true);

  }, [props.askContent]);

  return (

    <div>
      <form>
        <Button variant='secondary' style={{ margin: "3%" }} onClick={onSubmit}>
          발송
        </Button>
      </form>

      <Modal show={show} onHide={() => { setShow(false); }}  >
        <Modal.Body style={{ textAlign: "center" }}>
          <br />
          <h4>소중한 의견 감사합니다😍</h4>
          {/* 설문 josn post하기 */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => { setShow(false); }}>확인</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export { AskSubmitButton }