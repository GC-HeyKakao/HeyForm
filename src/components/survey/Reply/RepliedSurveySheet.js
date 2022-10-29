// import { Preview } from "../Preview";
// import { CreateQR } from "../CreateQR";
// import { SetPush } from "../SetPush";
// import { SubmmitButton } from "./SubmmitButton";

// //완성된 설문지를 확인해보기 위한 js
// function RepliedSurveySheet()
// {
//   const { surveyId } = useParams();
//   console.log('surveyid',surveyId)
//   console.log("SurveySheet 시작");
//   // console.log('surveysheet', dtos);

//   let dto = null;
//   let dtoJson = null;
//   let replys = useRecoilValue(replyState);
//   let replyHandler = useSetRecoilState(replyState);
//   let copy = [...replys];
//   const [surveyTitle, setTitle] = useState("title");
//   const [category, setCategory] = useState([]);
//   const [savedQsList, setSavedQsList] = useState([]);
//   const [surveyDes, setDes] = useState([]);
//   let userId = window.localStorage.getItem('token');
//   let createrId = window.localStorage.getItem("creater[" + 1 + "]");
//   let savedQsList2 = JSON.parse(window.localStorage.getItem("savedQsList[" + 1 + "]"));
//   let shareWay = window.localStorage.getItem("shareWay[" + 1 + "]")
//   let [savedAsList, setSavedAsList] = useState([]);
//   let [survey_id, setId] = useState();


//   useEffect(() => {

//     //url을 넘겨줘서 설문 dto 가져옴. 이거 파싱해서 설문지 생성할거임
//     CreateSurveyByURL(surveyId)
//       .then((res) => {
//         dto = res;
//         dtoJson = JSON.stringify(dto);
//         //surveyTitle = dtoJson.surveyDto.survey_title;
//         setTitle(dto.surveyDto.survey_title);
//         setCategory(dto.surveyDto.category);
//         setSavedQsList(dto.questionDtos);
//         setDes(dto.surveyDto.description);
//         setId(dto.surveyDto.survey_id);
//         console.log(savedQsList);
//         console.log('dto:', dto);
//         console.log('dto title', dto.surveyDto.survey_title);
//         console.log('dto que', dto.questionDtos);
//         console.log('saved qs lig', savedQsList2);
//       }, (err) => console.log(err))

//   }, [ replys]);


//   function OnKey(type, idx, e) {

//     var value = e.target.value;

//     console.log(replys);
//     copy[idx] = {
//       surveyId: surveyId,
//       type: type,
//       idx: idx,
//       value: value,

//     }

//     replyHandler(copy);

//   }

//   //체크박스 체크 여부 확인
//   //체크여부에 따라서 체크된 항목 번호 리턴 (Alert로 표시)
//   function is_checked(type, idx, ItemIdx) {

//     var Checkbox = new Array();
//     var is_checked = new Array();
//     Checkbox[ItemIdx] = document.getElementById(ItemIdx);
//     is_checked[ItemIdx] = Checkbox[ItemIdx].checked;


//     if (is_checked[ItemIdx] == true) {
//       ckAnswer.push(ItemIdx);

//     }
//     else {
//       var index = ckAnswer.indexOf(ItemIdx);
//       ckAnswer.splice(index, 1);
//     }

//     let str = ckAnswer.join();
//     alert(str);

//     copy[idx] = {
//       surveyId: surveyId,
//       type: type,
//       idx: idx,
//       value: str,
//     }
//     console.log("copy", copy);
//     replyHandler(copy);

//   }

//   console.log(category);
//   let backgroundColor = 'white';
//   if (category == '운동') {
//     backgroundColor = '#DEEBF7'
//   } else if (category == '만족도') {
//     backgroundColor = '#FFE5EB';
//   }
//   else if (category == '환경') {
//     backgroundColor = '#E2F0D9'
//   }

//   return (
//     <>
//       <Card className='basicCard' style={{ padding: "3%", backgroundColor: backgroundColor }}>
//         <h2 style={{ marginBottom: "3%", textAlign: "center" }}>{surveyTitle}</h2>
//         <h6 style={{ marginBottom: "5%", textAlign: "center" }}>{surveyDes}</h6>
//         {
//           console.log("map", savedQsList)}
//           {
//           savedQsList && savedQsList.map((item) => {
//             return (
              
//               {
//                 '단답식':
//                   // <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
//                   <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
//                     <Card.Title> Q{item['question_order']+1}: {item['question_contents']} </Card.Title>

//                     <Card.Body>
//                       <div>
//                         <Form.Control id="answer" onKeyUp={e => { OnKey("단답식", item['question_order'] + 1, e) }} type="text" placeholder="답변을 입력해주세요." />
//                       </div>
//                       {/* <Form.Control id="answer" size="sm" 
//                       type="text" placeholder="답변을 입력해주세요."/> */}
//                     </Card.Body>
//                   </Card>,
//                 '객관식':
//                   <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
//                     <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
//                     <Card.Body>
//                       {
//                         // savedQs['qsItemList'].map(
//                         // 	(qsItem, idx) => <Form.Check type="checkbox" id={idx} label={qsItem}/>
//                         // )
//                         item['choiceDtos'].map(
//                           ((choice) => <div key={choice['choice_order']}> <input className="form-check-input" id={choice['choice_order']} name={choice['choice_contents']} type="checkbox" value={choice['choice_contents']} onChange={(e) => is_checked("객관식", item['question_order'] + 1, choice['choice_order'])} />  {choice['choice_contents']} </div>
//                           ))
//                       }
//                     </Card.Body>
//                   </Card>,
//                 '별점':
//                   <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
//                     <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
//                     <Card.Body>
//                       <Star replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
//                     </Card.Body>
//                   </Card>,
//                 '리커트':
//                   <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
//                     <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
//                     <Card.Body>
//                       <Likertchart replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
//                     </Card.Body>
//                   </Card>,
//                 '감정바':
//                   <Card className='basicCard' key={item['question_order']} style={{ marginBottom: "3%", padding: "3%" }}>
//                     <Card.Title> Q{item['question_order'] + 1}: {item['question_contents']} </Card.Title>
//                     <Card.Body>
//                       <Slider category={category} replyHandler={replyHandler} idx={item['question_order'] + 1} surveyId={surveyId} />
//                     </Card.Body>
//                   </Card>,

//               }[item['question_type']]
//               // {
//               //   '단답식':
//               //     // <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
//               //     <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
//               //       <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>

//               //       <Card.Body>
//               //         <div>
//               //           <Form.Control id="answer" onKeyUp={e => { OnKey("단답식", idx + 1, e) }} size="sm" type="text" placeholder="답변을 입력해주세요." />
//               //         </div>
//               //         {/* <Form.Control id="answer" size="sm" type="text" placeholder="답변을 입력해주세요."/> */}
//               //       </Card.Body>
//               //     </Card>,
//               //   '객관식':
//               //     <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
//               //       <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
//               //       <Card.Body>
//               //         {
//               //           // savedQs['qsItemList'].map(
//               //           // 	(qsItem, idx) => <Form.Check type="checkbox" id={idx} label={qsItem}/>
//               //           // )
//               //           savedQs['qsItemList'].map(
//               //             ((qsItem, ItemIdx) => <div key={ItemIdx}> <input className="form-check-input" id={ItemIdx} name={qsItem} type="checkbox" value={qsItem} onChange={(e) => is_checked("객관식", idx + 1, ItemIdx)} />  {qsItem} </div>
//               //             ))
//               //         }
//               //       </Card.Body>
//               //     </Card>,
//               //   '별점':
//               //     <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
//               //       <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
//               //       <Card.Body>
//               //         <Star replyHandler={replyHandler} idx={idx + 1} surveyId={surveyId} />
//               //       </Card.Body>
//               //     </Card>,
//               //   '리커트':
//               //     <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
//               //       <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
//               //       <Card.Body>
//               //         <Likertchart replyHandler={replyHandler} idx={idx + 1} surveyId={surveyId} />
//               //       </Card.Body>
//               //     </Card>,
//               //   '감정바':
//               //     <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
//               //       <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
//               //       <Card.Body>
//               //         <Slider category={category} replyHandler={replyHandler} idx={idx + 1} surveyId={surveyId} />
//               //       </Card.Body>
//               //     </Card>,
//               // }[savedQs['type']]
//             )
//           }
//           )
//         }

//         {
//           //설문 작성자면 설문지를 공유하는 <ShareSurvey /> 컴포넌트를, 작성자가 아니라면 응답을 제출할 수 있는 <SubmmitButton /> 컴포넌트를 보여줌.
//           // userId === createrId ?
//           //   <ShareSurvey surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} endDate={props.endDate} shareWay={shareWay} />

//           //   :

//             <>
//               <SubmmitButton replys = {replys} surveyId={survey_id} />
//             </>
//         }

//       </Card>

//     </>

//   )
// }

// export {RepliedSurveySheet}