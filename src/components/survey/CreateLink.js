import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./CreateLink.css";
import { Snackbar, Alert } from '@mui/material';

function CreateLink(props) {

    const [show, setShow] = useState(false);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(props.link);
            setShow(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div style={{ marginLeft: '5px', marginBottom: '30px', float: 'left', textAlign: 'center' }}>
                <div className='shareComment'><h5>설문 링크</h5></div>
                {/* <div className='shareLink'>
                {props.link}
            </div> */}
                <Button size='lg' variant='light' className='center' onClick={copyLink}>복사하기</Button>
            </div>
            <Snackbar open={show} autoHideDuration={3000} onClose={() => { setShow(false) }}>
                <Alert onClose={() => { setShow(false) }}>
                    링크가 복사되었습니다 😊
                </Alert>
            </Snackbar>
            {/* <Modal show={show} onHide={() => { setShow(false); }}  >
                <Modal.Body style={{ textAlign: "center" }}>
                    <br />
                    <h4>링크가 복사되었습니다 😊</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => { setShow(false); }}>확인</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )

}

export { CreateLink };

