import { QRCodeSVG } from 'qrcode.react';
import { Button } from 'react-bootstrap'
import html2canvas from 'html2canvas';
import { useState } from "react";
import { Snackbar, Alert } from '@mui/material';
import "./CreateQR.css";

function CreateQR(props) {

    const [show, setShow] = useState(false);

    //qrcode를 이미지로
    function PrintDiv() {
        html2canvas(document.getElementById("qrcode")).then(function (canvas) {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "qrcode.png") //이미지 이름 설정
        });
    }

    //qrcode 이미지 다운로드
    function downloadURI(uri, name) {
        // PrintDiv()
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        setShow(true);
    }


    return (
        <>
            <div style={{ marginLeft: '15%', marginBottom: '30px', float: 'left', textAlign: 'center' }}>
                <div className='shareComment'><p className='h4'>QR 코드</p></div>
                {/* <div className='shareLink'>
                {props.link}
            </div> */}
                <div id="qrcode" className='qrcode'>
                    <QRCodeSVG value={props.link} />
                </div>
                    <Button size='lg' variant='light' className='center' onClick={PrintDiv} style={{ marginTop: "10px"}}><p className="h6" style={{marginTop:5}}>이미지로 저장 💾</p></Button>
                </div>
                <Snackbar open={show} autoHideDuration={3000} onClose={() => { setShow(false) }}>
                    <Alert onClose={() => { setShow(false) }}>
                        QR코드를 이미지로 저장했습니다 😊
                    </Alert>
                </Snackbar>
            </>
            )

}

            export {CreateQR}