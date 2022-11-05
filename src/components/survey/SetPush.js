import { EmailShareButton } from "../Survey/EmailShare/EmailShareButton"
import { KakaoShare } from "./KakaoShare"

function SetPush(props) {

    return (
        <>
            <div className='shareComment'><br /><h5>🙌 지금 바로 설문 응답을 요청하세요 🙌</h5></div>
            <br></br>
            <div className="center" style={{ marginTop: "3%" }}>
                <div style={{ marginBottom: "3%" }}>
                    <KakaoShare surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
                    <br></br>
                </div>
                <div style={{ marginTop: "3%" }}>
                    <EmailShareButton link={window.location.href} />
                </div>

            </div>
            <br></br>
            <div className='qrcodeBtn'>

            </div>
        </>
    )
}

export { SetPush }