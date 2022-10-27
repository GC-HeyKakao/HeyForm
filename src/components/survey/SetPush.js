import { useNavigate } from "react-router-dom"
import { EmailShareButton } from "../Survey/EmailShare/EmailShareButton"
import { KakaoShareButton } from "./KakaoShareButton"

function SetPush(props) {


    let naviget =useNavigate();

    return (
        <>
            <div className='shareComment'> <br></br><br></br><h6>🛎 알림 방식을 선택해주세요</h6></div>
        <br></br>
            <div style={{marginTop:"3%"}}>
                <div style={{marginBottom:"3%"}}>
                    <KakaoShareButton surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} endDate={props.endDate} />
                    <br></br>
                </div>
                <div style={{marginTop:"3%"}}>
                    <EmailShareButton link={window.location.href}/>
                </div>
                
            </div>
            <br></br>
            <div className='qrcodeBtn'>
                       
            </div>
        </>
    )
}

export { SetPush }