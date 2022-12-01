import { QRCodeSVG } from 'qrcode.react';
import { Button } from 'react-bootstrap'
import html2canvas from 'html2canvas';
import "./CreateQR.css";

function CreateQR(props) {

    //qrcode를 이미지로
    function PrintDiv() {

        html2canvas(document.getElementById("qrcode")).then(function (canvas) {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "qrcode.png") //이미지 이름 설정
        });
    }

    //qrcode 이미지 다운로드
    function downloadURI(uri, name) {
        var link = document.createElement("a")
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
    }


    return (
        <>
            <div className='shareComment'><br /><h5>QR코드</h5></div>
            <br></br>
            <div id="qrcode" className='qrcode'>
                <QRCodeSVG value={props.link} //코드 링크 설정
                />
            </div>
            <br></br>
            <div className='qrcodeBtn'>
                <Button variant='secondary' className='qrcodeBtn' onClick={() => { PrintDiv() }}>이미지 저장하기</Button>
            </div>
        </>
    )

}

export { CreateQR }