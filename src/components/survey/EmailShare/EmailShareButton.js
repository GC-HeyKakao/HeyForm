import React, { useState, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import {EmailInput} from './EmailInput';
import {EmailList} from './EmailList';
import { EmailHead } from './EmailHead';

function EmailShareButton() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const no = useRef(1)

    const [todos,setTodos] = useState([])

    const onAdd = (text) => {
        setTodos([
            ...todos,
            {
                id:no.current++,
                text:text,
            }
        ])
    }

    const onDel = (id) => {
        setTodos(todos.filter(todo=>todo.id !== id))
    }

    return (

        <>

            
                <Modal stylec={{  width: "512px", height: "768px"}} className="Modal" show={show} onHide={handleClose}>
                    
                    <EmailHead todos={todos} onDel/>
                    <EmailList todos={todos} onDel={onDel}/>
                    <EmailInput onAdd={onAdd}/>
                    
                </Modal>
            
                
        
        
        <div className="kakao-share-button">
            {/* Email share button */}
            <button id="Email-link-btn" style={{backgroundColor:"transparent", color:"black", border:"none"}} onClick={()=>{handleShow()}}>
                <img src = "sendEmailBtn.png"></img>
            </button>
        </div >

        </>

        

        
    )
}

export { EmailShareButton }