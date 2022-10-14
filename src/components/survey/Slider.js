import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
//import './App.css';

function Slider (props) {
  const [currentValue, setCurrentValue] = useState(0);
  const [type, setType] = useState("만족도");

  useEffect(()=> {
    // setType(props.category)
    // console.log("type:" ,type);
  });

  return (


    <>
    

    {

      props.category == "운동" ?
        <ReactSlider
          className="customSlider"
          trackClassName="customSlider-track-exercise"
          thumbClassName="customSlider-thumb-exercise"
          min={0}
          max={100}
          defaultValue={0}
          value={currentValue}
          onChange={(value) => setCurrentValue(value)}
          />

          :

          props.category == "만족도" ?
            <ReactSlider
              className="customSlider"
              trackClassName="customSlider-track-satisfy"
              thumbClassName="customSlider-thumb-satisfy"
              min={0}
              max={100}
              defaultValue={0}
              value={currentValue}
              onChange={(value) => setCurrentValue(value)}
            /> 

            :

            <>
              <ReactSlider
                className="customSlider"
                trackClassName="customSlider-track-echo"
                thumbClassName="customSlider-thumb-echo"
                min={0}
                max={100}
                defaultValue={0}
                value={currentValue}
                onChange={(value) => setCurrentValue(value)}
              />

            </>


    }
    
    {/* <div style={{marginLeft:"30%"}} className="percentage">{currentValue}%</div> */}
    <div style={{marginLeft:"30%", marginBottom:"5%"}} className="percentage"></div>
    </>
  );
};

export default Slider;