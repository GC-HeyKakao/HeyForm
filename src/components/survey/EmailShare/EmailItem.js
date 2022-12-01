import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { emailState } from '../../../atom';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5c636a;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #dee2e6;
  }
`;

const TodoItemBlock = styled.div`

  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const EmailItem = ({emails, onDel}) => {

    const {id, text} = emails;

    return (
        <div style={{overflow:"auto"}}>
        <TodoItemBlock>
        <Text>{text}</Text>
        <Remove onClick={()=>{onDel(id)}}>
          <MdDelete />
        </Remove>
      </TodoItemBlock>
      </div>
    );

        };

export {EmailItem};