import React from 'react';
import styled from 'styled-components';
import { EmailItem } from './EmailItem';


const EmailListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom:50px;
  overflow-y: auto;
`;

const EmailList = ({emails, onDel}) => {

    return (
        <EmailListBlock>
            {
                emails && emails.map(emails=><EmailItem key={emails.id}
                    emails={emails} onDel={onDel}/>)
            }
        </EmailListBlock>
    );
};

export { EmailList };
