import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { emailState } from '../../../atom';
import { useSetRecoilState } from 'recoil';

const CircleButton = styled.button`
  background: #565e64;
  &:hover {
    background: #898D91;
  }
  &:active {
    background: #898D91;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #EC4F4D;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  height: 0px;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 64px;
  padding-right: 32px;
  padding-bottom: 45px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const EmailInput = ({onAdd}) => {

    const [open, setOpen] = useState(false);
    const textRef = useRef()
    const [text,setText] = useState('')

    const onToggle = () => setOpen(!open);

    const changeInput = (evt) => {
        const {value} = evt.target
        setText(value)
    }

    const onSubmit = (evt) => {
        evt.preventDefault() //새로고침 방지

        if(!text) return //text에 아무것도 없을 때 - 공백 입력 방지

        onAdd(text)

        setText('')
        textRef.current.focus();
    }

    return (

        <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
          <Input type='email' value={text} 
                onChange={changeInput} ref={textRef}
                placeholder="이메일을 입력한 후, Enter를 눌러주세요."/>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
         
};

export {EmailInput};