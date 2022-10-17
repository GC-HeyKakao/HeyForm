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
    const shareWay = window.localStorage.getItem("shareWay")
    const category = window.localStorage.getItem("category")

    return (
        <>

        {
          <Preview category={category} savedQsList={savedQsList} curQs={curQs} curQsItemList={curQsItemList}
              curSelectedType={curSelectedType} surveyTitle={surveyTitle} />
          
        }

        {
          <SubmmitButton />
        }
        </>
      );
}

export {TestReply}