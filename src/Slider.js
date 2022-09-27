import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import ReactSlider from "react-slider";

const Slider = () => {
  const [currentValue, setCurrentValue] = useState(0);

  return (
    <>
    <ReactSlider
      className="customSlider"
      thumbClassName="customSlider-thumb"
      trackClassName="customSlider-track"
      markClassName="customSlider-mark"
      marks={30}
      min={0}
      max={100}
      defaultValue={0}
      value={currentValue}
      onChange={(value) => setCurrentValue(value)}
      renderMark={(props) => {
         if (props.key < currentValue) {
           props.className = "customSlider-mark customSlider-mark-before";
         } else if (props.key === currentValue) {
           props.className = "customSlider-mark customSlider-mark-active";
         }
         if (currentValue> 50){
           props.thumbClassName= "customSlider-thumb.customSlider-thumb-before";
         }
         else if (currentValue < 50){
           props.thumbClassName = "customSlider-thumb";
         }
         return <span {...props} />;
      }}
    
    />
    
    <div>{currentValue}</div>
    </>
  );
};

export default Slider;