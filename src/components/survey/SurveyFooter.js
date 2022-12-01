import { userState } from '../../atom'
import { useState, useEffect } from 'react';
import { GetSurveyByToken } from '../../API/Survey/GetSurveyByToken'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ShareSurvey } from "./ShareSurvey";
import { SubmmitButton } from "./Reply/SubmmitButton";

function SurveyFooter(props) {

    const users = useRecoilValue(userState);
    const userHandler = useSetRecoilState(userState);
    var url = new Array();
    const [urlList, setUrlList] = useState([]);

    useEffect(() => {
    
      GetSurveyByToken(users, userHandler)
          .then((res) => {
            let dto2=res;
            for(var i=0; i<Object.keys(dto2).length; i++)
            {
              url.push(dto2[i].surveyDto.survey_url)
              console.log("url??", url);
            }
            setUrlList(url);
            console.log("final",url);
          }, (err) => console.log(err))
    
          console.log("urlList", url);
    
      }, []);

      return (

        //설문 작성자면 설문지를 공유하는 <ShareSurvey /> 컴포넌트를, 작성자가 아니라면 응답을 제출할 수 있는 <SubmmitButton /> 컴포넌트를 보여줌.
        props.shareWay!=="respondent" && urlList.indexOf(props.surveyUrl) !== -1 ?
        <ShareSurvey
              surveyTitle={props.surveyTitle}
              surveyDescription={props.surveyDescription}
              start_time={props.start_time}
              end_time={props.end_time}
              shareWay={props.shareWay} />

        :

        <>
          <SubmmitButton replys = {props.replys} surveyId={props.surveyId} />
        </>
      )
}

export { SurveyFooter }