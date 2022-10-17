import {QRCodeSVG} from 'qrcode.react';
import { Button } from 'react-bootstrap'

function CreateLink(props) {

    return (
        <>
            <div className='shareComment'> <br></br><br></br>📌 설문지를 공유할 수 있는 링크입니다.</div>
                <br></br>
                <div className='shareLink'>
                <br></br>{props.link}
            </div>
        </>
    )
    
}

export { CreateLink }
