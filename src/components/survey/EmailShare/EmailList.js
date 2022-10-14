import React from 'react';
import {EmailItem} from './EmailItem';
import styled from 'styled-components';


const EmailListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom:50px;
  overflow-y: auto;
`;

const EmailList = ({todos,onDel}) => {
    return (
        <EmailListBlock>
            {
                todos.map(todos=><EmailItem key={todos.id}
                    todos={todos} onDel={onDel}/>)
            }
        </EmailListBlock>
    );
};

export {EmailList};