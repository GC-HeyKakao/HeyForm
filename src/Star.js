import ReactStars from 'react-stars'
import React from 'react'
import {useState} from "react"
const Star = () => {
    const [currentValue, setCurrentValue] = useState(0);


    return (
        <>
        <ReactStars
            count = {5}
            value = {currentValue}
            onChange = {(value) => setCurrentValue(value)}
            size = {50}
            color2 = {'#ffd700'}
        />
        <div>{currentValue}</div>
        </>
    );
}
export default Star;