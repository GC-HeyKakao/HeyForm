import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import sendEmailBtn from '../../../sendEmailBtn.png';
import { EmailHead } from './EmailHead';
import { EmailInput } from './EmailInput';
import { EmailList } from './EmailList';
import { Button } from "react-bootstrap";

function EmailShareButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const no = useRef(1)

    const [emails, setEmails] = useState([])

    const onAdd = (text) => {
        setEmails([
            ...emails,
            {
                id: no.current++,
                text: text,
            }
        ])
    }

    const onDel = (id) => {
        setEmails(emails.filter(email => email.id !== id))
    }

    return (
        <>
            <Modal stylec={{ width: "512px", height: "768px" }} className="Modal" show={show} onHide={handleClose}>

                <EmailHead link={props.link} emails={emails} onDel />
                <EmailList emails={emails} onDel={onDel} />
                <EmailInput onAdd={onAdd} />

            </Modal>


            <div style={{ float:'left', marginLeft:'10px', marginBottom:'20px'}} >
                {/* Email share button */}
                    {/* <img src={sendEmailBtn} style={{height:'100px'}}></img> */}
                    <Button size='lg' onClick={() => { handleShow() }} id="Email-link-btn" variant='light'>이메일 💌</Button>
            </div >

        </>

    )
}

export { EmailShareButton };
