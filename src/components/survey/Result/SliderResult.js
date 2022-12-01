import { ResponsivePie } from '@nivo/pie'

const SliderResult = (props) => {

    console.log("감정바 들어옴", props.resultDto[props.idx][0]);

    let data = [
        {
            "id": "0~30",
            "value": 0,
        },
        {
            "id": "30~60",
            "value": 0,
        },
        {
            "id": "60~90",
            "value": 0,
        },
        {
            "id": "90~100",
            "value": 0,
        }
    ]

    let val = new Array;

    for(var i=0; i<4; i++) {
        val[i]=0;
    }


    for(var i=0; i<Object.keys(props.resultDto[props.idx][0]).length; i++) {

        if(props.resultDto[props.idx][0][i].id < 30) {
            val[0]++;
        }
        else if(props.resultDto[props.idx][0][i].id >= 30 && props.resultDto[props.idx][0][i].id<60) {
            val[1]++;
        }
        else if(props.resultDto[props.idx][0][i].id >= 60 && props.resultDto[props.idx][0][i].id<90) {
            val[2]++;
        }
        else if(props.resultDto[props.idx][0][i].id >= 90 && props.resultDto[props.idx][0][i].id<=100) {
            val[3]++;
        }
        
    }

    for(var i =0; i<4; i++)
    {
        data[i].value = val[i];
    }

    return (
        <>
            <h5>Q{props.idx}: {props.title}</h5>
            <div style={{ height: "500px" }}>
                <ResponsivePie
                    data={data}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: 'red_purple' }}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'c'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'go'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'python'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'scala'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'lisp'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'elixir'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'javascript'
                            },
                            id: 'lines'
                        }
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </>
    )
}

export default SliderResult;