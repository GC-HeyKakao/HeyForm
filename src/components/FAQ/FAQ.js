import React, { useEffect, useState } from "react";
//import "../css/FAQ.css"

const qnaList = [
    {
        question: '로그인을 해야 이용할 수 있나요?', 
        answer: '네. 비회원 서비스를 제공하지 않으니 로그인 후 이용 바랍니다.' ,
    },
    {
        question: "회원을 탈퇴하고 싶어요.",
        answer: '로그아웃 및 회원탈퇴 기능은 마이페이지에서 진행하실 수 있습니다. 로그인 후 상단 네비게이션 바의 우측에 위치한 닉네임을 클릭하시면 마이페이지 화면으로 전환됩니다.',
    },
    {
        question: "다른 문의사항이 있으면 어떻게 하나요?",
        answer: '이용가이드 > 문의하기 로 이동 후, 게시판에 글을 작성해주시길 바랍니다.',
    },
];

function FAQ({ className }) {
	 const [cardOnOff, setCardOnOff] = useState(qnaList);
    const [showList, setShowList] = useState(qnaList);

    //alert("aboutCommon")
  
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
              qnaList[index].show
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
        qnaList.filter((item) => {
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

export { FAQ };
