import { ResponsiveCalendar } from '@nivo/calendar'

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
                    },
                    {
                        "value": 376,
                        "day": "2016-09-14"
                      },
                      {
                        "value": 260,
                        "day": "2016-09-17"
                      },
                      {
                        "value": 204,
                        "day": "2016-12-07"
                      },
                      {
                        "value": 90,
                        "day": "2015-06-01"
                      },
                      {
                        "value": 144,
                        "day": "2015-04-02"
                      },
                      {
                        "value": 10,
                        "day": "2015-06-27"
                      },
                      {
                        "value": 283,
                        "day": "2018-06-24"
                      },
                      {
                        "value": 108,
                        "day": "2017-03-19"
                      },
                      {
                        "value": 329,
                        "day": "2015-06-15"
                      },
                      {
                        "value": 280,
                        "day": "2015-10-30"
                      },
                      {
                        "value": 77,
                        "day": "2015-11-13"
                      },
                      {
                        "value": 140,
                        "day": "2016-06-25"
                      },
                      {
                        "value": 389,
                        "day": "2017-02-21"
                      },
                      {
                        "value": 260,
                        "day": "2017-09-07"
                      },
                      {
                        "value": 146,
                        "day": "2015-07-02"
                      },
                      {
                        "value": 148,
                        "day": "2018-01-28"
                      },
                      {
                        "value": 334,
                        "day": "2018-03-25"
                      },
                      {
                        "value": 267,
                        "day": "2016-05-28"
                      },
                      {
                        "value": 8,
                        "day": "2015-10-19"
                      },
                      {
                        "value": 191,
                        "day": "2016-12-06"
                      },
                      {
                        "value": 131,
                        "day": "2016-03-04"
                      },
                      {
                        "value": 131,
                        "day": "2016-04-14"
                      },
                      {
                        "value": 297,
                        "day": "2018-06-04"
                      },
                      {
                        "value": 156,
                        "day": "2017-02-07"
                      },
                      {
                        "value": 117,
                        "day": "2016-10-08"
                      },
                      {
                        "value": 88,
                        "day": "2015-05-10"
                      },
                      {
                        "value": 261,
                        "day": "2015-07-17"
                      },
                      {
                        "value": 65,
                        "day": "2015-08-20"
                      },
                      {
                        "value": 357,
                        "day": "2017-06-15"
                      },
                      {
                        "value": 319,
                        "day": "2018-01-17"
                      },
                      {
                        "value": 374,
                        "day": "2017-08-13"
                      },
                      {
                        "value": 88,
                        "day": "2018-02-24"
                      },
                      {
                        "value": 168,
                        "day": "2017-01-12"
                      },
                      {
                        "value": 396,
                        "day": "2018-07-21"
                      },
                      {
                        "value": 99,
                        "day": "2018-03-19"
                      },
                      {
                        "value": 60,
                        "day": "2016-10-10"
                      },
                      {
                        "value": 276,
                        "day": "2016-09-29"
                      },
                      {
                        "value": 354,
                        "day": "2015-08-22"
                      },
                      {
                        "value": 142,
                        "day": "2016-09-13"
                      },
                      {
                        "value": 28,
                        "day": "2015-08-03"
                      },
                      {
                        "value": 253,
                        "day": "2016-02-22"
                      },
                      {
                        "value": 57,
                        "day": "2018-07-05"
                      },
                      {
                        "value": 51,
                        "day": "2017-05-06"
                      },
                      {
                        "value": 123,
                        "day": "2017-11-22"
                      },
                      {
                        "value": 3,
                        "day": "2017-10-17"
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