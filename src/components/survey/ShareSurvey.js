import { CreateLink } from "./CreateLink";
import { CreateQR } from "./CreateQR";
import { SetPush } from "./SetPush";
import { HOST } from "../../OAuth"
import { Row, Col } from "react-bootstrap";

function ShareSurvey(props) {
  const shareWay = props.shareWay;
  return (
    <>
      {
        shareWay === "QR" ?

          <>
            <div style={{ width: "auto" }}>
              <Row>
                <Col>
                  <CreateLink link={window.location.href} />
                </Col>
                <Col>
                  <CreateQR link={window.location.href} />
                </Col>
                <Col>
                  <SetPush surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
                </Col>
              </Row>
            </div>

            {/* <div className="areaShare">
              <div style={{ marginRight: "5%" }}>
                <CreateQR link={window.location.href} />
              </div>
              <div style={{ marginLeft: "5%" }}>
                <SetPush surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
              </div>
            </div> */}
          </>

          :

          shareWay === "null" ?
            <div className="areaShare" style={{ width: "auto" }}>
              <row>
                <div style={{ margin: "auto" }}>
                  <CreateLink link={window.location.href} />
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <SetPush surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
                </div>
              </row>
            </div>

            :

            shareWay === "workSpace" ?

              <div className="areaShare">
                    <CreateLink link={HOST + "survey/" + props.link} />
                    <SetPush link={HOST + "survey/" + props.link} surveyTitle={props.surveyTitle} surveyDescription={props.surveyDescription} start_time={props.start_time} end_time={props.end_time} />
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