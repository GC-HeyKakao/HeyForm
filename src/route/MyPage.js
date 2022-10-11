import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { Footer } from '../components/Footer.js'
import React, { useState, useEffect } from "react";

function MyPage() {

    return (
        <>
            <div className="wraper">
                <div className="content">
                    mypage입니다.
                </div>
                <Footer />
            </div>
        </>
    )
}

export { MyPage }