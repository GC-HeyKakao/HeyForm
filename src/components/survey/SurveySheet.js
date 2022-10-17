import { Preview } from "./Preview";
import { ShareSurvey } from "./ShareSurvey";
import { SubmmitButton } from "./Reply/SubmmitButton";
import { CreateQR } from "./CreateQR";
import { SetPush } from "./SetPush";
import {CreateLink } from "./CreateLink"
import { useParams } from 'react-router-dom'

//완성된 설문지를 확인해보기 위한 js
function SurveySheet()
{
    const savedQsList = JSON.parse(window.localStorage.getItem("savedQsList"));
    const curQs = JSON.parse(window.localStorage.getItem("curQs"));
    const curQsItemList = JSON.parse(window.localStorage.getItem("curQsItemList"));
    const curSelectedType = JSON.parse(window.localStorage.getItem("curSelectedType"));
    const surveyTitle = JSON.parse(window.localStorage.getItem("surveyTitle"));
    const category = window.localStorage.getItem("category")
    const shareWay = window.localStorage.getItem("shareWay")
    
    //userId = 설문지에 접속한 유저 ID, createrId = 해당 설문지를 만든 사용자의 ID
    let userId = "aaa"
    let createrId = "bbb"

    return (
        <>
        
          <Preview category={category} savedQsList={savedQsList} curQs={curQs} curQsItemList={curQsItemList}
              curSelectedType={curSelectedType} surveyTitle={surveyTitle} />
        

        {
          //설문 작성자면 설문지를 공유하는 <ShareSurvey /> 컴포넌트를, 작성자가 아니라면 응답을 제출할 수 있는 <SubmmitButton /> 컴포넌트를 보여줌.
          userId === createrId?
            <ShareSurvey />

            :

          <>
          <SubmmitButton />
          </>
        }

        </>
      );
}

export { SurveySheet }