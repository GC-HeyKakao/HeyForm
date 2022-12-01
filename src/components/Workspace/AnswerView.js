import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Likertchart from '../Survey/Likertchart';
import Slider from '../Survey/Slider';
import Star from '../Survey/Star';
import '../../components/Survey/Preview.css'

function AnswerView(props) {

    const [surveyTitle, setTitle] = useState('');
    const [category, setCategory] = useState([]);
    const [savedQsList, setSavedQsList] = useState([]);
    const [surveyDes, setDes] = useState([]);
    const [userAnswerDto, setUserAnswerDto] = useState([]);

    useEffect(() => {
        console.log("dto", props)
        //url을 넘겨줘서 설문 dto 가져옴. 이거 파싱해서 설문지 생성할거임
        if (props.surveyDto !== undefined) {
            setTitle(props.surveyDto.surveyDto.survey_title);
            setCategory(props.surveyDto.surveyDto.category);
            setSavedQsList(props.surveyDto.questionDtos);
            setDes(props.surveyDto.surveyDto.description);
            setUserAnswerDto(props.answersDto);
        }

    }, [props]);

	let backgroundColor = 'white';
	let textColor = 'black';
	if (category == '운동') {
		backgroundColor = '#DEEBF7'
	} 
    else if (category == '기본') {
		backgroundColor = '#F8F8FD';
	}
	else if (category == '환경') {
		backgroundColor = '#ACE383'
	}
	else if (category == '동물') {
		backgroundColor = '#FDEEF4';
	}
	else if (category == '정치') {
		backgroundColor = '#eee'
	}
	else if (category == '학교') {
		backgroundColor = '#fef5d4'
	}
	else if (category == '음악') {
		backgroundColor = '#EC67AD'
	}
    else if (category == '영화') {
		backgroundColor = '#272E56';
		textColor = 'white';
	}
	else if (category == '예술') {
		backgroundColor = '#7E354D'
		textColor = 'white';
	}
	else if (category == '게임') {
		backgroundColor = '#342D7E'
		textColor = 'white';
	}
	else if (category == '식사') {
		backgroundColor = '#FAEBD7'
	}
	else {
		backgroundColor = '#F8F8FD'
	}

    return (
        <>
        
        <Card className='basicCard' style={{ marginTop:"20px", padding: "3%", backgroundColor: backgroundColor, border:"none", overflowY: "auto", width: "100%", height: "100%" }}>
				<p className='h1' style={{ color: textColor, marginLeft: "10%", marginRight: "10%", marginTop:"7%", textAlign: "left", fontWeight: "bold" }}>{surveyTitle}</p>
				<p className='h4' style={{ color: textColor, marginLeft: "10%", marginRight: "10%", marginTop:"2%", marginBottom: "5%", textAlign: "left" }}>{surveyDes}</p>
                {
                    console.log("map", savedQsList)}
                {
                    savedQsList && savedQsList.map((item) => {

                        return (

                            {
                                '단답식':
                                    <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                                        <Card.Title style={{marginTop:"10px"}}> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                                        <Card.Body>
                                            <div>
                                                <input className="input-shortanswer form-control" size="sm" style={{ borderColor: backgroundColor }} type="text" value={userAnswerDto.answerDtos[item['question_order']].answer_contents} readOnly />
                                            </div>
                                        </Card.Body>
                                    </Card>,
                                '객관식':
                                    <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                                        <Card.Title style={{marginTop:"10px"}}> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                                        <Card.Body>
                                            {

                                                item['choiceDtos'].map(
                                                    ((choice, idx) => <div key={choice['choice_order']}> <input className="form-check-input" id={choice['choice_order']} name={choice['choice_contents']} type="checkbox" value={choice['choice_contents']} checked={userAnswerDto.answerDtos[item['question_order']].answer_contents.split(" ")[idx] || ''} disabled />  {choice['choice_contents']} </div>
                                                    ))
                                            }
                                        </Card.Body>
                                    </Card>,
                                '별점':
                                <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                                    <Card.Title style={{marginTop:"10px"}}> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                                    <Card.Body>
                                            <Star view='view' value={userAnswerDto.answerDtos[item['question_order']].answer_contents} />
                                        </Card.Body>
                                    </Card>,
                                '리커트':
                                <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                                    <Card.Title style={{marginTop:"10px"}}> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                                    <Card.Body>
                                            <Likertchart back='white' value={userAnswerDto.answerDtos[item['question_order']].answer_contents} />
                                        </Card.Body>
                                    </Card>,
                                '감정바':
                                <Card className='basicCard' key={item} style={{ margin: "5%", marginBottom: "3%", padding: "3%", border: "none", borderRadius: "20px" }}>
                                    <Card.Title  style={{marginTop:"10px"}}> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
                                    <Card.Body>
                                            <Slider value={userAnswerDto.answerDtos[item['question_order']].answer_contents} category={category} />
                                        </Card.Body>
                                    </Card>,

                            }[item['question_type']]

                        )
                    }
                    )
                }

            </Card>

        </>

    )
}

export { AnswerView };
