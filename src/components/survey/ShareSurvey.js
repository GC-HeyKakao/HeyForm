import { CreateLink } from "./CreateLink";
import { CreateQR } from "./CreateQR";
import { SetPush } from "./SetPush";

function ShareSurvey(props) {
  const shareWay = props.shareWay;

  return (
    <>
      {
        shareWay === "QR" ?

          <div className="areaShare">
            <div style={{ marginRight: "5%" }}>
              <CreateQR link={window.location.href} />
            </div>
            <div style={{ marginLeft: "5%" }}>
              <SetPush surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
            </div>
          </div>


          :

          shareWay === "Link" ?
            <div className="areaShare">
              <div style={{ marginRight: "5%" }}>
                <CreateLink link={window.location.href} />
              </div>
              <div style={{ marginLeft: "5%" }}>
                <SetPush surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
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
