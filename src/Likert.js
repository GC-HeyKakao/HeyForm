import { useState } from "react";
import Likert from "react-likert-scale";

const Likert = () => {
    const [currentValue, setCurrentValue] = useState(0);
    let likertOptions = {
        responses: [
            { value: 1, text: "Abysmal" },
            { value: 2, text: "Poor" },
            { value: 3, text: "Average", checked: true },
            { value: 4, text: "Good" },
            { value: 5, text: "Excellent" }
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