import React, { useState, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import {EmailInput} from './EmailInput';
import {EmailList} from './EmailList';
import { EmailHead } from './EmailHead';
import sendEmailBtn from '../../../sendEmailBtn.png'
import { emailState } from '../../../atom';
import { useRecoilState, useSetRecoilState, } from 'recoil';

function EmailShareButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const no = useRef(1)

    const [emails, setEmail] = useRecoilState(emailState);

    const emailHandler = useSetRecoilState(emailState);

    const onAdd = (text) => {
        emailHandler([
            ...emails,
            {
                id:no.current++,
                text:text,
            }
        ])
    }

    const onDel = (id) => {
        emailHandler(emails.filter(email=>email.id !== id))
    }

    return (

        <>

            
                <Modal stylec={{  width: "512px", height: "768px"}} className="Modal" show={show} onHide={handleClose}>
                    
                    <EmailHead link={props.link}/>
                    <EmailList onDel={onDel}/>
                    <EmailInput onAdd={onAdd}/>
                    
                </Modal>
            
                
        
        
        <div className="kakao-share-button">
            {/* Email share button */}
            <button id="Email-link-btn" style={{backgroundColor:"transparent", color:"black", border:"none"}} onClick={()=>{handleShow()}}>
            <img src={sendEmailBtn}></img>
            </button>
        </div >

        </>

        

        
    )
}

export { EmailShareButton }