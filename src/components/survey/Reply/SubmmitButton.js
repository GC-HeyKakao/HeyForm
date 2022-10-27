import React, { useCallback, useState } from 'react';
import { RiCreativeCommonsSaLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { Users } from '../../../API/Users'
import { useNavigate } from 'react-router-dom';

function SubmmitButton() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ textAlign: "center" }}>
          <br/>
          <h3>소중한 답변 감사합니다 😊</h3>
          <h5>응답한 설문지는 워크스페이스에서 확인 가능합니다</h5>
          <br/>
          <Button onClick={() => navigate('/workspace')}>확인</Button>
        </Modal.Body>
      </Modal>

      <br></br>
      <div className='submmitBtn' >
        <Button style={{ margin: "3%" }} type="submit"
          onClick={() => { setShow(true) }}>
          제출
        </Button>
      </div>
    </>
  );

}

export { SubmmitButton };
