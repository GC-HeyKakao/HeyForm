import React from 'react';
import {EmailItem} from './EmailItem';
import styled from 'styled-components';
import { emailState } from '../../../atom';
import { useRecoilValue } from 'recoil';


const EmailListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom:50px;
  overflow-y: auto;
`;

const EmailList = ({onDel}) => {

    
    const emails = useRecoilValue(emailState);

    return (
        <EmailListBlock>
            {
                emails && emails.map(emails=><EmailItem key={emails.id}
                    emails={emails} onDel={onDel}/>)
            }
        </EmailListBlock>
    );
};

export {EmailList};