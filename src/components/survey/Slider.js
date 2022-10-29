import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { replyState } from "../../atom.js"
import { useRecoilValue } from 'recoil';
import "./Slider.css";

function Slider (props) {
  const [currentValue, setCurrentValue] = useState(0);
  const replys = useRecoilValue(replyState);

  let copy = [...replys];

  useEffect(()=> {
    
    console.log(replys);
  }, [replys]);

  function setValue(value) {

    console.log(replys);
    copy[props.idx] = {
      surveyId: props.surveyId,
      type: "만족도",
      idx: props.idx,
      value: value.toString(),
    }

    props.replyHandler(copy);
    
}

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
          onChange={(value) => {setCurrentValue(value); setValue(value)}
          }
          
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
              onChange={(value) => {setCurrentValue(value); setValue(value)}}
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
                onChange={(value) => {setCurrentValue(value); setValue(value)}}
              />

            </>

            
    }

    
    
    {/* {
      console.log('type : 감정바' + 'idx : ' + props.idx + ', value : ' + currentValue)
      } */}
    <div style={{marginLeft:"30%", marginBottom:"12%"}} className="percentage"></div>
    </>
  );
};

export default Slider;