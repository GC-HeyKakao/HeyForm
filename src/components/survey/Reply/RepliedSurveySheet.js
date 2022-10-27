import { Preview } from "../Preview";
import { CreateQR } from "../CreateQR";
import { SetPush } from "../SetPush";
import { SubmmitButton } from "./SubmmitButton";

//완성된 설문지를 확인해보기 위한 js
function RepliedSurveySheet()
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

        {/* 응답한 설문지 확인용 컴포넌트.. 워크스페이스에서 응답한 설문지 보여주면 이걸로 넘어가면 될듯??? */}

        </>
      );
}

export {RepliedSurveySheet}