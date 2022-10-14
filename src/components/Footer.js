import { RiGithubFill, RiYoutubeFill, RiKakaoTalkFill } from "react-icons/ri";

function Footer() {

    return (
        <>
            <div className="footer">
                <h3 style={{ float: "left", padding: "10px 0px 0px 20px", vertical: "bottom" }}>
                    <strong>🙋‍♂️헤이카카오🙋‍♀️</strong>
                </h3>
                <div style={{ float: "right",
                              padding: "0px 20px 0px 0px" }}>
                    <RiGithubFill size="40" style={{ 
                              margin: "0px 0px 0px 10px" }} onClick={() => window.open('https://github.com/DW-K/HeyForm', '_blank')}></RiGithubFill> 
                    <RiYoutubeFill size="40" style={{ 
                              margin: "0px 0px 0px 10px" }} />
                    <RiKakaoTalkFill size="40" style={{ 
                              margin: "0px 0px 0px 10px" }}/>
                </div>
                <p style={{ float: "right",
                            padding: "0px 10px 0px 0px"}}>연락처: 010-7572-6804 <br />
                    이메일: pch14545@gmail.com
                </p>
            </div>
        </>
    )
}

export { Footer }
