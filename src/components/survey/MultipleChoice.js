

function MultipleChoice(props) {

    var ckAnswer = new Array();
    const item= props.item;

    const replys = props.replys;
    let copy = replys;

    function is_checked(type, idx, ItemIdx) {

        var Checkbox = new Array();
        var is_checked = new Array();
        Checkbox[ItemIdx] = document.getElementById(ItemIdx);
        is_checked[ItemIdx] = Checkbox[ItemIdx].checked;
    
    
        console.log("객관식?", replys);
        if (is_checked[ItemIdx] == true) {
          ckAnswer[ItemIdx]="checked";
          console.log("check", ItemIdx);
        }
        else {
          ckAnswer[ItemIdx]="";
          //ckAnswer.push("unchecked");
        }
    
        let str = ckAnswer.join(" ");
        //alert(str);
    
        copy[idx] = {
          surveyId: props.surveyId,
          type: type,
          idx: idx,
          value: str,
        }
        const arr = str.split(" ");
        //console.log("Arr", arr);
        //console.log("copy", copy);
        props.replyHandler(copy);
    
      }

      return (
        item['choiceDtos'].map(
            ((choice) => <div key={choice['choice_order']}> <input className="form-check-input" id={choice['choice_order']} name={choice['choice_contents']} type="checkbox" value={choice['choice_contents']} onChange={(e) => is_checked("객관식", item['question_order'] + 1, choice['choice_order'])} />  {choice['choice_contents']} </div>
            ))
      )
}

export { MultipleChoice }