import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { Footer } from '../components/Footer.js'
import React, { useState, useEffect } from "react";
import Slider from '../components/survey/Slider.js';
import Likertchart from '../components/survey/Likertchart.js';
import Star from '../components/survey/Star.js';

function MyPage() {

    return (
        <>
            <div className="wraper">
                <div className="content">
                    mypage입니다.
                    <Slider/>                 
                    <Star/>
                    <Likertchart/>
                </div>
                <Footer />
            </div>
        </>
    )
}

export { MyPage }