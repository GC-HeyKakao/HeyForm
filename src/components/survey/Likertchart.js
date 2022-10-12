import { useState } from "react";
import Likert from "react-likert-scale";

const Likertchart = () => {
    const [currentValue, setCurrentValue] = useState(0);
    let likertOptions = {
        responses: [
            { value: 1, text: "전혀 그렇지 않다" },
            { value: 2, text: "그렇지 않다" },
            { value: 3, text: "보통이다" },
            { value: 4, text: "그렇다" },
            { value: 5, text: "매우 그렇다" }
        ],
        onChange: val => {
            console.log(val);
            setCurrentValue(val)
        }

    }
    return(
        <Likert {...likertOptions}/>
    );
}
export default Likertchart;