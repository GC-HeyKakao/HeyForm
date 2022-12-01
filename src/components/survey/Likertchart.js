import Likert from "react-likert-scale";
import { useState, useEffect } from 'react'
import { replyState } from "../../atom.js"
import { useRecoilValue } from 'recoil';
import './Likertchart.css'
import { Card } from 'react-bootstrap';
import { textAlign } from "@mui/system";

const Likertchart = (props) => {
    const [currentValue, setCurrentValue] = useState(0);

    const replys = props.replys;

    let copy = replys;

    const answerValue = props.value;
    let answerChecked = [false, false, false, false, false];
    answerChecked[answerValue] = true;

    // useEffect(() => {
    //     console.log(replys);
    // }, [replys]);

    function setValue(value) {

        console.log(replys);
        copy[props.idx] = {
            surveyId: props.surveyId,
            type: "리커트",
            idx: props.idx,
            value: value,
        }

        props.replyHandler(copy);

    }

    let likertOptions = {
        responses: [
            { value: 1, text: "전혀 그렇지 않다" },
            { value: 2, text: "그렇지 않다" },
            { value: 3, text: "보통이다" },
            { value: 4, text: "그렇다" },
            { value: 5, text: "매우 그렇다" }
        ],
        onChange: val => {

            setCurrentValue(val)
            setValue(val.value)
        }

    }

    let likertOptions2 = {
        responses: [
            { value: 1, text: "전혀 그렇지 않다", checked: answerChecked[1] },
            { value: 2, text: "그렇지 않다", checked: answerChecked[2] },
            { value: 3, text: "보통이다", checked: answerChecked[3] },
            { value: 4, text: "그렇다", checked: answerChecked[4] },
            { value: 5, text: "매우 그렇다", checked: answerChecked[5] }
        ],

        onChange: val => {
            setCurrentValue(val)
            setValue(val.value)
        }
    }

    return (
    <>
        {props.back === 'black' &&
        <div>
            {
                props.value === undefined ?
                    <div style={{color:'rgb(248,248,253'}}><Likert {...likertOptions} /></div>
                    :
                    <div style={{color:'rgb(248,248,253'}}><Likert {...likertOptions2} disabled /></div>
            }
        </div>}

        {props.back === 'white' &&
        <div>
            {
                props.value === undefined ?
                    <Likert className='white' {...likertOptions} />
                    :
                    <Likert {...likertOptions2} disabled />
            }
        </div>}

        </>
    );

}
export default Likertchart;