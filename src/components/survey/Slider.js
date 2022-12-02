import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { replyState } from "../../atom.js"
import { useRecoilValue } from 'recoil';
import "./Slider.css";

function Slider(props) {
  const [currentValue, setCurrentValue] = useState(0);
  const replys = props.replys;

  let copy = replys;

  useEffect(() => {

    console.log(replys);
  }, [replys]);

  function setValue(value) {

    console.log(replys);
    copy[props.idx] = {
      surveyId: props.surveyId,
      type: "기본",
      idx: props.idx,
      value: value,
    }

    props.replyHandler(copy);

  }

  return (


    <>


      {

        props.category == "운동" ?
          props.value === undefined ?

            <ReactSlider
              className="customSlider"
              trackClassName="customSlider-track-exercise"
              thumbClassName="customSlider-thumb-exercise"
              min={0}
              max={100}
              defaultValue={0}
              value={currentValue}
              onChange={(value) => { setCurrentValue(value); setValue(value) }
              } />

            :

            <ReactSlider
              className="customSlider"
              trackClassName="customSlider-track-exercise"
              thumbClassName="customSlider-thumb-exercise"
              value={Number(props.value)}
              disabled
            />



          :

          props.category == "기본" ?
            props.value === undefined ?
              <ReactSlider
                className="customSlider"
                trackClassName="customSlider-track-satisfy"
                thumbClassName="customSlider-thumb-satisfy"
                min={0}
                max={100}
                defaultValue={0}
                value={currentValue}
                onChange={(value) => { setCurrentValue(value); setValue(value) }}
              //disabled
              />

              :

              <ReactSlider
                className="customSlider"
                trackClassName="customSlider-track-satisfy"
                thumbClassName="customSlider-thumb-satisfy"
                value={Number(props.value)}
                disabled
              />

            :

            props.category == "환경" ?
              props.value === undefined ?

                <ReactSlider
                  className="customSlider"
                  trackClassName="customSlider-track-echo"
                  thumbClassName="customSlider-thumb-echo"
                  min={0}
                  max={100}
                  defaultValue={0}
                  value={currentValue}
                  onChange={(value) => { setCurrentValue(value); setValue(value) }}
                />

                :

                <ReactSlider
                  className="customSlider"
                  trackClassName="customSlider-track-echo"
                  thumbClassName="customSlider-thumb-echo"
                  value={Number(props.value)}
                  disabled
                />

              :

              props.category == "정치" ?
                props.value === undefined ?

                  <ReactSlider
                    className="customSlider"
                    trackClassName="customSlider-track-politics"
                    thumbClassName="customSlider-thumb-politics"
                    min={0}
                    max={100}
                    defaultValue={0}
                    value={currentValue}
                    onChange={(value) => { setCurrentValue(value); setValue(value) }}
                  />

                  :

                  <ReactSlider
                    className="customSlider"
                    trackClassName="customSlider-track-politics"
                    thumbClassName="customSlider-thumb-politics"
                    value={Number(props.value)}
                    disabled
                  />

                :

                props.category == "학교" ?
                  props.value === undefined ?

                    <ReactSlider
                      className="customSlider"
                      trackClassName="customSlider-track-school"
                      thumbClassName="customSlider-thumb-school"
                      min={0}
                      max={100}
                      defaultValue={0}
                      value={currentValue}
                      onChange={(value) => { setCurrentValue(value); setValue(value) }}
                    />

                    :

                    <ReactSlider
                      className="customSlider"
                      trackClassName="customSlider-track-school"
                      thumbClassName="customSlider-thumb-school"
                      value={Number(props.value)}
                      disabled
                    />

                  :

                  props.category == "음악" ?
                    props.value === undefined ?

                      <ReactSlider
                        className="customSlider"
                        trackClassName="customSlider-track-music"
                        thumbClassName="customSlider-thumb-music"
                        min={0}
                        max={100}
                        defaultValue={0}
                        value={currentValue}
                        onChange={(value) => { setCurrentValue(value); setValue(value) }}
                      />

                      :

                      <ReactSlider
                        className="customSlider"
                        trackClassName="customSlider-track-music"
                        thumbClassName="customSlider-thumb-music"
                        value={Number(props.value)}
                        disabled
                      />

                    :



                    props.category == "동물" ?
                      props.value === undefined ?

                        <ReactSlider
                          className="customSlider"
                          trackClassName="customSlider-track-animal"
                          thumbClassName="customSlider-thumb-animal"
                          min={0}
                          max={100}
                          defaultValue={0}
                          value={currentValue}
                          onChange={(value) => { setCurrentValue(value); setValue(value) }}
                        />

                        :

                        <ReactSlider
                          className="customSlider"
                          trackClassName="customSlider-track-animal"
                          thumbClassName="customSlider-thumb-animal"
                          value={Number(props.value)}
                          disabled
                        />

                      :

                      props.category == "예술" ?
                        props.value === undefined ?

                          <ReactSlider
                            className="customSlider"
                            trackClassName="customSlider-track-art"
                            thumbClassName="customSlider-thumb-art"
                            min={0}
                            max={100}
                            defaultValue={0}
                            value={currentValue}
                            onChange={(value) => { setCurrentValue(value); setValue(value) }}
                          />

                          :

                          <ReactSlider
                            className="customSlider"
                            trackClassName="customSlider-track-art"
                            thumbClassName="customSlider-thumb-art"
                            value={Number(props.value)}
                            disabled
                          />

                        :

                        props.category == "게임" ?
                          props.value === undefined ?

                            <ReactSlider
                              className="customSlider"
                              trackClassName="customSlider-track-game"
                              thumbClassName="customSlider-thumb-game"
                              min={0}
                              max={100}
                              defaultValue={0}
                              value={currentValue}
                              onChange={(value) => { setCurrentValue(value); setValue(value) }}
                            />

                            :

                            <ReactSlider
                              className="customSlider"
                              trackClassName="customSlider-track-game"
                              thumbClassName="customSlider-thumb-game"
                              value={Number(props.value)}
                              disabled
                            />

                          :

                          props.category == "식사" ?
                            props.value === undefined ?

                              <ReactSlider
                                className="customSlider"
                                trackClassName="customSlider-track-meal"
                                thumbClassName="customSlider-thumb-meal"
                                min={0}
                                max={100}
                                defaultValue={0}
                                value={currentValue}
                                onChange={(value) => { setCurrentValue(value); setValue(value) }}
                              />

                              :

                              <ReactSlider
                                className="customSlider"
                                trackClassName="customSlider-track-meal"
                                thumbClassName="customSlider-thumb-meal"
                                value={Number(props.value)}
                                disabled
                              />

                            :

                            props.category == "영화" ?
                              props.value === undefined ?

                                <ReactSlider
                                  className="customSlider"
                                  trackClassName="customSlider-track-movie"
                                  thumbClassName="customSlider-thumb-movie"
                                  min={0}
                                  max={100}
                                  defaultValue={0}
                                  value={currentValue}
                                  onChange={(value) => { setCurrentValue(value); setValue(value) }}
                                />

                                :

                                <ReactSlider
                                  className="customSlider"
                                  trackClassName="customSlider-track-movie"
                                  thumbClassName="customSlider-thumb-movie"
                                  value={Number(props.value)}
                                  disabled
                                />

                              :


                              props.value === undefined ?

                                <ReactSlider
                                  className="customSlider"
                                  trackClassName="customSlider-track-satisfy"
                                  thumbClassName="customSlider-thumb-satisfy"
                                  min={0}
                                  max={100}
                                  defaultValue={0}
                                  value={currentValue}
                                  onChange={(value) => { setCurrentValue(value); setValue(value) }}
                                />

                                :

                                <ReactSlider
                                  className="customSlider"
                                  trackClassName="customSlider-track-satisfy"
                                  thumbClassName="customSlider-thumb-satisfy"
                                  value={Number(props.value)}
                                  disabled
                                />


      }

      {/* {
console.log('type : 감정바' + 'idx : ' + props.idx + ', value : ' + currentValue)
} */}
      <div style={{ marginLeft: "30%", marginBottom: '70px' }} className="percentage"></div>
    </>
  );
};

export default Slider;