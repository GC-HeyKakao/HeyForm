import { EmailShareButton } from "../Survey/EmailShare/EmailShareButton"
import { KakaoShare } from "./KakaoShare"
import { Row, Col, Button } from 'react-bootstrap';
function SetPush(props) {

    console.log(props);
    return (
        <div style={{ float:'left', marginLeft:'15%'}}> 
            <div className='shareComment'><br /><h5>설문 공유 📬</h5></div>
            <div style={{ marginTop: "10px"}}>
                    <KakaoShare link={props.link} surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
                    <EmailShareButton link={props.link} />
            </div>
            <br></br>
        </div>
    )
}

export { SetPush }