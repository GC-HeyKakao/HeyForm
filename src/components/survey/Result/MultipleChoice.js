import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const MultipleChoice = (props) => {
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
            <h5>객관식 문항: 질문이 들어갈 자리입니다</h5>
            <div style={{ width: '750px', height: '500px', marginLeft: '100px' }}>
                <ResponsiveBar
                    /**
                     * chart에 사용될 데이터
                     */
                    // data = props.data;
                    data={[
                        { choice: '1번 문항', 응답수: 5 },
                        { choice: '2번 문항', 응답수: 1 },
                        { choice: '3번 문항', 응답수: 4 },
                        { choice: '4번 문항', 응답수: 7 },
                        { choice: '5번 문항', 응답수: 2 }
                    ]}
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
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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