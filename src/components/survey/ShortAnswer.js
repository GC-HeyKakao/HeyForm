import { Card, Form } from 'react-bootstrap';


function ShortAnswer(props) {

    var ckAnswer = new Array();
    const item= props.item;

    const replys = props.replys;
    let copy = replys;

    function OnKey(type, idx, e) {

        var value = e.target.value;
    
        // console.log(replys);
        copy[idx] = {
          surveyId: props.surveyId,
          type: type,
          idx: idx,
          value: value,
  
        }
    
        props.replyHandler(copy);
    
      }

      return (
        
        <input className="input-shortanswer form-control" size="sm" style={{ borderColor: props.backgroundColor }} id="answer" onKeyUp={e => { OnKey("단답식", item['question_order'] + 1, e) }} type="text" placeholder="답변을 입력해주세요." />

      )
}

export { ShortAnswer }