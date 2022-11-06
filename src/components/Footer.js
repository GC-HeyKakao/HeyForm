import { RiGithubFill, RiYoutubeFill, RiKakaoTalkFill } from "react-icons/ri";
import './Footer.css'

function Footer() {

    return (
        <>
            <div className="footer">
                {/* <h3 className="footerName" style={{ float: "left", padding: "10px 0px 0px 20px", vertical: "bottom" }}>
                    <strong>🙋‍♂️헤이카카오🙋‍♀️</strong>
                </h3> */}
                <div style={{
                    float: "right",
                    padding: "0px 20px 0px 0px"
                }}>
                    <RiGithubFill className="footerIcon" onClick={() => window.open('https://github.com/orgs/GC-HeyKakao/repositories', '_blank')}></RiGithubFill>
                    <RiYoutubeFill className="footerIcon" />
                    <RiKakaoTalkFill className="footerIcon" />
                </div>
                <p style={{
                    float: "right",
                    padding: "0px 10px 0px 0px"
                }}>Copyright 2022. 헤이카카오 All rights reserved.<br />
                    Contact. pch14545@gmail.com
                </p>
            </div>
        </>
    )
}

export { Footer }
