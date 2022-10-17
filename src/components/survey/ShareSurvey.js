import { Preview } from "./Preview";
import { CreateQR } from "./CreateQR";
import { SetPush } from "./SetPush";
import {CreateLink } from "./CreateLink"
import { useParams } from 'react-router-dom'

//완성된 설문지를 확인해보기 위한 js
function ShareSurvey()
{
    const shareWay = window.localStorage.getItem("shareWay")
    
    //surveyId를 '1'이라고 가정
    //const { surveyId } = useParams();

    return (
        <>
          {
            shareWay === "QR"?
            
            <div className="areaShare">
              <div style={{marginRight:"5%"}}>
                <CreateQR />
              </div>
              <div style={{marginLeft:"5%"}}>
                <SetPush />
              </div>
            </div>
              

            
            :

            shareWay === "Link"?
            <div className="areaShare">
              <div style={{marginRight:"5%"}}>
                <CreateLink/>
              </div>
              <div style={{marginLeft:"5%"}}>
                <SetPush/>
              </div>
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

export { ShareSurvey }