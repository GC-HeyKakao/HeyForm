import { Button } from "react-bootstrap";
import "./CreateLink.css";

function CreateLink(props) {

    const copyLink =  async() => {
        try {
            await navigator.clipboard.writeText(props.link);
            alert('링크가 복사되었습니다 😊');
          } catch (error) {
            alert('링크가 복사되지 않았습니다 😥');
          }
    }

    return (
        <>
            <div className='shareComment'> <br /><h5>🌟 아래의 링크로 설문을 공유하세요 🌟</h5></div>
            <br></br>
            <div className='shareLink'>
                {props.link}
            </div>
            <br/>
            <div className='center-wrapper-120'>
            <Button className='center' onClick={copyLink}>복사하기</Button>
            </div>
        </>
    )

}

export { CreateLink }
