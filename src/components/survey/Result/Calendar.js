// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/calendar
import { ResponsiveCalendar } from '@nivo/calendar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Calendar = ({  /* see data tab */ }) => {

    return (

        <div style={{ width: "100%", height: "550px" }}>
            <ResponsiveCalendar
                data={[
                    {
                        "value": 277,
                        "day": "2015-05-17"
                    },
                    {
                        "value": 286,
                        "day": "2017-02-03"
                    },
                    {
                        "value": 178,
                        "day": "2016-06-26"
                    },
                    {
                        "value": 19,
                        "day": "2018-04-16"
                    },
                    {
                        "value": 361,
                        "day": "2015-09-26"
                    },
                    {
                        "value": 85,
                        "day": "2018-06-13"
                    },
                    {
                        "value": 285,
                        "day": "2015-11-20"
                    },
                    {
                        "value": 122,
                        "day": "2016-05-31"
                    },
                    {
                        "value": 221,
                        "day": "2016-12-24"
                    },
                    {
                        "value": 97,
                        "day": "2015-12-29"
                    },
                    {
                        "value": 243,
                        "day": "2017-07-31"
                    },
                    {
                        "value": 334,
                        "day": "2017-06-05"
                    },
                    {
                        "value": 222,
                        "day": "2016-06-20"
                    },
                    {
                        "value": 10,
                        "day": "2015-05-06"
                    },
                    {
                        "value": 193,
                        "day": "2016-11-21"
                    },]}

                from="2015-03-01"
                to="2017-08-12"
                emptyColor="#eeeeee"
                //colors={['#7c50b9', '#e267aa', '#ff6f9b', '#ffc36d']}
                //colors={['#4472C4', '#8EB7FF', '#ffc36d', '#ff6f9b']}
                colors={['#D8E9FF', '#96D2FF', '#0D6EFD', '#0228B3']} //오른쪽으로 갈수록 진하다
                align="top"
                margin={{ top:60, right: 60,left: 60 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
            </div>
    );
}


export default Calendar;