import { useNavigate } from "react-router-dom"
import { EmailShareButton } from "../Survey/EmailShare/EmailShareButton"
import { KakaoShareButton } from "./KakaoShareButton"

function SetPush() {


    let naviget =useNavigate();

    return (
        <>
            <div className='shareComment'> <br></br><br></br>🔔 알림 방식을 선택해주세요.</div>
        <br></br>
            <div style={{marginTop:"10%"}}>
                <div style={{marginBottom:"3%"}}>
                    <KakaoShareButton />
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