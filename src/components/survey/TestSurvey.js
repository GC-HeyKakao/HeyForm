import { Preview } from "./Preview";
import { CreateQR } from "./CreateQR";
import { SetPush } from "./SetPush";

//완성된 설문지를 확인해보기 위한 js
function TestSurvey()
{
    const savedQsList = JSON.parse(window.localStorage.getItem("savedQsList"));
    const curQs = JSON.parse(window.localStorage.getItem("curQs"));
    const curQsItemList = JSON.parse(window.localStorage.getItem("curQsItemList"));
    const curSelectedType = JSON.parse(window.localStorage.getItem("curSelectedType"));
    const surveyTitle = JSON.parse(window.localStorage.getItem("surveyTitle"));
    const shareWay = window.localStorage.getItem("shareWay")
    const category = window.localStorage.getItem("category")

    return (
        <>

        {
          <Preview category={category} savedQsList={savedQsList} curQs={curQs} curQsItemList={curQsItemList}
              curSelectedType={curSelectedType} surveyTitle={surveyTitle} />
        }
          {
            shareWay === "QR"?
            
            <div className="areaShare">
              <div style={{marginRight:"5%"}}>
                <CreateQR/>
              </div>
              <div style={{marginLeft:"5%"}}>
                <SetPush/>
              </div>
              
            </div>
              

            
            :

            shareWay === "Link"?
            <div className="shareLink">
              <br></br>{window.location.href}
              <CreateQR/>
            </div>
            
            :

            <> 
            <div>

            </div>
            </>
          }

        </>
      );
}

export {TestSurvey}