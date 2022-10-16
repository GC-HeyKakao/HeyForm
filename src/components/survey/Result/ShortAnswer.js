import React from 'react'
import { TagCloud } from 'react-tagcloud'

const data = [
    { value: 'jQuery', count: 25 },
    { value: 'MongoDB', count: 18 },
    { value: 'JavaScript', count: 38 },
    { value: 'React', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'Express.js', count: 25 },
    { value: 'HTML5', count: 33 },
    { value: 'CSS3', count: 20 },
    { value: 'Webpack', count: 22 },
    { value: 'Babel.js', count: 7 },
    { value: 'ECMAScript', count: 25 },
    { value: 'Jest', count: 15 },
    { value: 'Mocha', count: 17 },
    { value: 'React Native', count: 27 },
    { value: 'Angular.js', count: 30 },
    { value: 'TypeScript', count: 15 },
    { value: 'Flow', count: 30 },
    { value: 'NPM', count: 11 },
]

// custom random color options
// see randomColor package: https://github.com/davidmerfield/randomColor
const options = {
    luminosity: 'bright',
    hue: 'blue',
}

export default () => (
    <>
        <h5>단답식 문항: 질문이 들어갈 자리입니다</h5>
        <TagCloud
            minSize={5}
            maxSize={60}
            colorOptions={options}
            tags={data}
            onClick={(tag) => console.log('clicking on tag:', tag)}
        />
    </>
)