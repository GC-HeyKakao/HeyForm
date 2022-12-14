import React from 'react'
import { TagCloud } from 'react-tagcloud'

function ShortAnswer(props) {
    
    console.log("data", props.resultDto[props.idx])
    const data = props.resultDto[props.idx][0];

    // for(let i=0; i<Object.keys(props.resultDto[props.idx][0]).length; i++) {
    //     data.push(props.resultDto[props.idx][0][i])
    // }

    console.log(data);
    // const data = [
    //     { value: 'jQuery', count: 25 },
    //     { value: 'MongoDB', count: 18 },
    //     { value: 'JavaScript', count: 38 },
    //     { value: 'React', count: 30 },
    //     { value: 'Nodejs', count: 28 },
    //     { value: 'Express.js', count: 25 },
    //     { value: 'HTML5', count: 33 },
    //     { value: 'CSS3', count: 20 },
    //     { value: 'Webpack', count: 22 },
    //     { value: 'Babel.js', count: 7 },
    //     { value: 'ECMAScript', count: 25 },
    //     { value: 'Jest', count: 15 },
    //     { value: 'Mocha', count: 17 },
    //     { value: 'React Native', count: 27 },
    //     { value: 'Angular.js', count: 30 },
    //     { value: 'TypeScript', count: 15 },
    //     { value: 'Flow', count: 30 },
    //     { value: 'NPM', count: 11 },
    // ]

    console.log(data);
    
    // custom random color options
    // see randomColor package: https://github.com/davidmerfield/randomColor
    const options = {
        luminosity: 'bright',
        hue: 'blue',
    }
    
    return (
        <>
            <h5>Q{props.idx}: {props.title}</h5>
            <br/>
            { console.log("주관식 들어옴", props.resultDto[props.idx]) }
            <TagCloud 
                minSize={5}
                maxSize={60}
                colorOptions={options}
                tags={data}
                onClick={(tag) => console.log('clicking on tag:', tag)}
            />
        </>
    )


}

// const data = [
//     { value: 'jQuery', count: 25 },
//     { value: 'MongoDB', count: 18 },
//     { value: 'JavaScript', count: 38 },
//     { value: 'React', count: 30 },
//     { value: 'Nodejs', count: 28 },
//     { value: 'Express.js', count: 25 },
//     { value: 'HTML5', count: 33 },
//     { value: 'CSS3', count: 20 },
//     { value: 'Webpack', count: 22 },
//     { value: 'Babel.js', count: 7 },
//     { value: 'ECMAScript', count: 25 },
//     { value: 'Jest', count: 15 },
//     { value: 'Mocha', count: 17 },
//     { value: 'React Native', count: 27 },
//     { value: 'Angular.js', count: 30 },
//     { value: 'TypeScript', count: 15 },
//     { value: 'Flow', count: 30 },
//     { value: 'NPM', count: 11 },
// ]

// // custom random color options
// // see randomColor package: https://github.com/davidmerfield/randomColor
// const options = {
//     luminosity: 'bright',
//     hue: 'blue',
// }

// export default (props) => (
//     <>
//         <h5>Q{props.idx}: {props.title}</h5>
//         { console.log("객관식 들어옴", props.resultDto[props.idx]) }
//         <TagCloud 
//             minSize={5}
//             maxSize={60}
//             colorOptions={options}
//             tags={data}
//             onClick={(tag) => console.log('clicking on tag:', tag)}
//         />
//     </>
// )

export { ShortAnswer }