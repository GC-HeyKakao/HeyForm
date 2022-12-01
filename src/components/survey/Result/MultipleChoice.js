import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const MultipleChoice = (props) => {

    console.log("객관식 들어옴", props.resultDto[props.idx][0]);

    console.log("choiceDto",props.choiceDto);
    const choiceDto = props.choiceDto;

    let data = [];
    let count = [];
    let choiceContents=[];

    for(var i=0; i<Object.keys(choiceDto).length; i++) {
        data.push({
            응답수: 0,
            choice: choiceDto[i].choice_contents,
        })

        count[i] = 0;
    }

    for(var i=0; i<Object.keys(props.resultDto[props.idx][0]).length; i++) {
        choiceContents[i] = props.resultDto[props.idx][0][i].choice.split(" ");
    }

    for(var i=0; i<choiceContents.length; i++) {
        for(var j=0; j<2; j++) {
            if(choiceContents[i][j]=="checked") {
                count[j]+=Number(props.resultDto[props.idx][0][i].응답수);
            }
        }
    }

    for(var i=0; i<Object.keys(choiceDto).length; i++) {

        data[i]={
            응답수: count[i],
            choice: choiceDto[i].choice_contents,
        }

    }


    const handle = {
        barClick: (data) => {
            console.log(data);
        },

        legendClick: (data) => {
            console.log(data);
        },
    };

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <>
            <h5>Q{props.idx}: {props.title}</h5>
            <div style={{ width: "auto", height:"400px", padding: "0px", margin: "auto" }}>
                <ResponsiveBar
                    /**
                     * chart에 사용될 데이터
                     */
                    // data = props.data;
                    data={data}
                    /**
                     * chart에 보여질 데이터 key (측정되는 값)
                     */
                    keys={['응답수']}
                    /**
                     * keys들을 그룹화하는 index key (분류하는 값)
                     */
                    indexBy="choice"
                    /**
                     * chart margin
                     */
                     margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                     /**
                     * chart padding (bar간 간격)
                     */
                    padding={0.3}
                    /**
                     * vertical or horizontal
                     */
                    layout="vertical"
                    /**
                     * chart 색상
                     */
                    colors={{ "scheme": "yellow_green_blue" }} // 커스터하여 사용할 때
                    // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                    /**
                     * color 적용 방식
                     */
                    colorBy="indexValue" // 색상을 keys 요소들에 각각 적용
                    /**
                     * bar 클릭 이벤트
                     */
                    onClick={handle.barClick}
                />
            </div>
        </>
    );
};

export default MultipleChoice;