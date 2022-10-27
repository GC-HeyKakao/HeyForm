import Likert from "react-likert-scale";
import { useState, useEffect } from 'react'
import { replyState } from "../../atom.js"
import { useRecoilValue } from 'recoil';

const Likertchart = (props) => {
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
    return(
        <Likert {...likertOptions}/>
    );
}
export default Likertchart;