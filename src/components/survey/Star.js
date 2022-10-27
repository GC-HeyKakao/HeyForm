import ReactStars from 'react-stars'
import React from 'react'
import { useState, useEffect } from 'react'
import { replyState } from "../../atom.js"
import { useRecoilValue } from 'recoil';

const Star = (props) => {
    const [currentValue, setCurrentValue] = useState(0);

    const replys = useRecoilValue(replyState);

    let copy = [...replys];

    useEffect(() => {

        console.log(replys);
    }, [replys]);

    function setValue(value) {

        console.log(replys);
        copy[props.idx] = {
            surveyId: props.surveyId,
            type: "별점",
            idx: props.idx,
            value: value,
        }

        props.replyHandler(copy);

    }

    return (
        <>
            <ReactStars
                count={5}
                value={currentValue}
                onChange={(value) => { setCurrentValue(value); setValue(value) }}
                size={50}
                color2={'#ffd700'}
                edit={true}
            />

            {/* {
                console.log('type : 별점' + 'idx : ' + props.idx + ', value : ' + currentValue)
            } */}

        </>



    );
}
export default Star;