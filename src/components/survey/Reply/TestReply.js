import { Preview } from "./Preview";
import { CreateQR } from "./CreateQR";
import { SetPush } from "./SetPush";
import { SubmmitButton } from "./SubmmitButton";

//완성된 설문지를 확인해보기 위한 js
function Testreply()
{
    const savedQsList = JSON.parse(window.localStorage.getItem("savedQsList"));
    const curQs = JSON.parse(window.localStorage.getItem("curQs"));
    const curQsItemList = JSON.parse(window.localStorage.getItem("curQsItemList"));
    const curSelectedType = JSON.parse(window.localStorage.getItem("curSelectedType"));
    const surveyTitle = JSON.parse(window.localStorage.getItem("surveyTitle"));
    const category = window.localStorage.getItem("category")

    console.log(category);
    let backgroundColor = 'white';
    if (category == '운동') {
      backgroundColor = '#DEEBF7'
    } else if (category == '만족') {
      backgroundColor = '#FFE5EB';
    }
    else if (category == '환경') {
      backgroundColor = '#E2F0D9'
    }
    return (
  
         <Card className='basicCard' style={{ padding: "3%", backgroundColor:backgroundColor }}>
          <h2 style={{ marginBottom: "3%", textAlign:"center" }}>{surveyTitle}</h2>
          {
            savedQsList.map((savedQs, idx) => {
              return (
                {
                  '단답식':
                    // <Card.Title className='basicCard' key={idx} style={{marginBottom: "3%"}}> </Card.Title>,
                    <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                      <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                      <Card.Body>
                        <Form.Control size="sm" type="text" placeholder="답변을 입력해주세요."
                        />
                      </Card.Body>
                    </Card>,
                  '객관식':
                    <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                      <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                      <Card.Body>
                        {
                          // savedQs['qsItemList'].map(
                          // 	(qsItem, idx) => <Form.Check type="checkbox" id={idx} label={qsItem}/>
                          // )
                          savedQs['qsItemList'].map(
                            ((qsItem, idx) => <div key={idx}> <input className="form-check-input" id={idx} name={qsItem} type="checkbox" value={qsItem} onChange={(e) => is_checked()} />  {qsItem} </div>
                            ))
                        }
                      </Card.Body>
                    </Card>,
                  '별점':
                    <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                      <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                      <Card.Body>
                        <Star />
                      </Card.Body>
                    </Card>,
                  '리커트 척도':
                    <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                      <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                      <Card.Body>
                        <Likertchart />
                      </Card.Body>
                    </Card>,
                  '감정바':
                    <Card className='basicCard' key={idx} style={{ marginBottom: "3%", padding: "3%" }}>
                      <Card.Title> Q{idx + 1}: {savedQs['qs']} </Card.Title>
                      <Card.Body>
                        <Slider category={category} />
                      </Card.Body>
                    </Card>,
                }[savedQs['type']]
              )
            }
            )
          }
          {
            curSelectedType != 'Type' && curQs != '' ?
              {
                '단답식': <Card.Title className='basicCard' > Q{savedQsList.length + 1}: {curQs} </Card.Title>,
                '객관식':
  
                  <Card className='basicCard'>
  
                    <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                    <Card>
                      {
                        curQsItemList.map(
                          ((curQsItem, idx) => <div key={idx}> <input className="form-check-input" id={idx} name={curQsItem} type="checkbox" value={curQsItem} />  {curQsItem} </div>
                          ))
                      }
                    </Card>
                  </Card>,
                '별점':
                  <>
                    <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                    <Star />
                  </>,
                '리커트 척도':
                  <>
                    <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                    <Likertchart />
                  </>,
                '감정바':
                  <>
                    <Card.Title>Q{savedQsList.length + 1}: {curQs} </Card.Title>
                    <Card.Body>
                      <Slider category={category} />
                    </Card.Body>
                  </>,
  
              }[curSelectedType]
              : null
          }
  
        </Card>
      
    )

    
}

export {Testreply}