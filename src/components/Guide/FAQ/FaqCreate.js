import React, { useEffect, useState } from "react";
//import "../css/FAQ.css"

const qnaList_create = [
  {
      question: '자동 추천되는 UI는 바꿀 수 없나요?', 
      answer: '네. UI를 변경하는 기능은 제공되지 않습니다. 만약 추천된 ui가 적절하지 않다고 생각되신다면 카테코리 변경을 통해 디자인을 변경해주세요.' ,
  },
  {
      question: "이메일 보내기와 카카오톡 메시지 모두 선택할 수는 없나요?",
      answer: '하나만 선택하실 수 있습니다.',
  },
  {
      question: "설문지를 수정하고 싶어요.",
      answer: '이미 배포된 설문지는 수정하실 수 없습니다.',
  },
  {
      question: "결과를 확인하고 싶으면 어떻게 해야 되나요?",
      answer: '워크스페이스 > 완료된 설문지 > 결과 확인을 원하는 설문지를 선택 후, "결과보기" 버튼을 클릭해주세요.',
  },
];

function FaqCreate({ className }) {
	 const [cardOnOff, setCardOnOff] = useState(qnaList_create);
    const [showList, setShowList] = useState(qnaList_create);
  
    const getQnACard = (item, index) => {
      return (
        <div className="faq-card" key={index}>
          <div
            className="faq-card-title"
            onClick={() => {
              let tempCard = cardOnOff;
              tempCard[index].show = !tempCard[index].show;
              setCardOnOff([...tempCard]);
            }}
          >
            <span className="question-mark">Q.</span>
            <span>{item.question}</span>
          </div>
          <div
            className={
              qnaList_create[index].show
                ? "faq-card-answer"
                : "faq-card-answer faq-card-none"
            }
          >
            <span className="answer-mark">A.</span>
            <span className="FAQ-card-answer">{item.answer}</span>
          </div>
        </div>
      );
    };
  
    useEffect(()=> {
      setShowList(
        qnaList_create.filter((item) => {
          // if (category === "all") return true;
          // if (category === item.category) return true;
          return true;
        })
      );
    }, );
  
    return (
      <div>
        {/* <div>faq</div> */}
        {/* <CategoryFilter
          categories={categories}
          category={category}
          setCatecory={setCatecory}
        /> */}
        <div className="fqa-parent">
          <div className="faq-list">
            {showList.map((item, index) => getQnACard(item, index))}     
          </div>
        </div>
      </div>
    );
}

export { FaqCreate };

