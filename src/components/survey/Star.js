import ReactStars from 'react-stars'
import React from 'react'
import { useState, useEffect } from 'react'

const Star = (props) => {
    const [currentValue, setCurrentValue] = useState(0);
    const replys = props.replys;
    let copy = replys;

    // useEffect(() => {

    //     console.log(replys);
    // }, [replys]);

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
            <div className='center'>
                {
                    props.value === undefined ?
                        <ReactStars
                            count={5}
                            value={currentValue}
                            color1='#EBEBEB'
                            onChange={(value) => { setCurrentValue(value); setValue(value) }}
                            size={50}
                            color2={'#ffd700'}
                            edit={true}
                            half={false}

                        />

                        :

                        props.value === undefined && props.view === 'view' ?
                            <ReactStars
                                count={5}
                                value={currentValue}
                                color1='#EBEBEB'
                                onChange={(value) => { setCurrentValue(value); setValue(value) }}
                                size={40}
                                color2={'#ffd700'}
                                edit={true}
                                half={false}

                            />

                            :

                            props.value !== undefined && props.view === 'view' ?
                                <ReactStars
                                    count={5}
                                    value={Number(props.value)}
                                    color1={'#EBEBEB'}
                                    //onChange={(value) => { setCurrentValue(value); setValue(value) }}
                                    size={40}
                                    color2={'#ffd700'}
                                    edit={false}

                                />

                                :

                                <ReactStars
                                    count={5}
                                    value={Number(props.value)}
                                    color1={'#EBEBEB'}
                                    //onChange={(value) => { setCurrentValue(value); setValue(value) }}
                                    size={50}
                                    color2={'#ffd700'}
                                    edit={false}

                                />



                }


            </div>

            {/* {
                console.log('type : 별점' + 'idx : ' + props.idx + ', value : ' + currentValue)
            } */}

        </>

    );
}
export default Star;