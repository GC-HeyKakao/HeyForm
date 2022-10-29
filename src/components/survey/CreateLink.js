import "./CreateLink.css";

function CreateLink(props) {

    return (
        <>
            <div className='shareComment'> <br></br><br></br><h6>📌 설문지를 아래의 링크로 공유하세요</h6></div>
                <br></br>
                <div className='shareLink'>
                <br></br>{props.link}
            </div>
        </>
    )
    
}

export { CreateLink }
