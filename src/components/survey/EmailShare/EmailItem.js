import React from 'react';
import { MdDelete } from 'react-icons/md';
import styled, { css } from 'styled-components';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #0D6EFD;
  }
  display: none;
`;

const TodoItemBlock = styled.div`

  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
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

const EmailItem = ({todos,onDel}) => {

    const {id,text} = todos

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