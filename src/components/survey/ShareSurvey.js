import { CreateLink } from "./CreateLink";
import { CreateQR } from "./CreateQR";
import { SetPush } from "./SetPush";

//완성된 설문지를 확인해보기 위한 js
function ShareSurvey(props)
{
    const shareWay = props.shareWay;
    
    //surveyId를 '1'이라고 가정
    //const { surveyId } = useParams();
    
    return (
        <>
          {
            shareWay === "QR"?
            
            <div className="areaShare">
              <div style={{marginRight:"5%"}}>
                <CreateQR link={window.location.href}/>
              </div>
              <div style={{marginLeft:"5%"}}>
                <SetPush surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} endDate={props.endDate}/>
              </div>
            </div>
              

            
            :

            shareWay === "Link"?
            <div className="areaShare">
              <div style={{marginRight:"5%"}}>
                <CreateLink link={window.location.href}/>
              </div>
              <div style={{marginLeft:"5%"}}>
                <SetPush title={props.title} description={props.description} date={props.date}/>
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

export { ShareSurvey };
