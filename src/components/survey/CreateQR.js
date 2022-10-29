import {QRCodeSVG} from 'qrcode.react';
import { Button } from 'react-bootstrap'
import html2canvas from 'html2canvas';
import "./CreateQR.css";

function CreateQR(props) {

    //qrcode를 이미지로
    function PrintDiv(){
        
        html2canvas(document.getElementById("qrcode")).then(function(canvas){
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "qrcode.png") //이미지 이름 설정
        });
    }
    
    //qrcode 이미지 다운로드
    function downloadURI(uri, name){
        var link = document.createElement("a")
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
    }


    return (
        <>
            <div className='shareComment'> <br></br><br></br><h6>📌 설문지를 아래의 QR코드로 공유하세요</h6></div>
        <br></br>
            <div id="qrcode" className='qrcode'>
                <QRCodeSVG value={props.link} //코드 링크 설정
                />
            </div>
            <br></br>
            <div className='qrcodeBtn'>
                <Button className = 'qrcodeBtn' onClick={()=>{PrintDiv()}}>QR코드 이미지로 저장하기</Button>        
            </div>
        </>
    )
    
}

export { CreateQR }