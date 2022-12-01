import React, { useEffect, useState } from "react";
import "./FAQ.css";

const qnaList_reply = [
  {
        question: "응답을 수정하고 싶을 땐 어떻게 하나요?",
        answer: '워크스페이스 > 진행중인 설문 > 수정 원하는 설문지로 이동 후, 수정을 마치고 "수정하기" 버튼을 눌러주세요. 제출 기한이 지난 설문은 수정할 수 없습니다.' ,
  },
  {
      question: "응답자인 제가 알림 방식을 바꿀 수는 없나요?",
      answer: '알림 방식은 설문자가 설문지를 제작할 때에만 설정할 수 있습니다.',
  },
  {
      question: "설문지 알림을 받고 싶지 않아요.",
      answer: '마이페이지에서 알림 수신 여부를 체크해주세요. 로그인 후 상단 네비게이션 바의 우측에 위치한 닉네임을 클릭하시면 마이페이지 화면으로 전환됩니다.',
  },
  {
      question: "익명으로 응답하고 싶어요.",
      answer: '응답하실 때 익명 응답 옵션을 체크해주세요. 다만, 설문자가 익명 응답을 허용한 경우에만 해당 기능을 사용하실 수 있습니다.',
  },
];

function FaqReply({ className }) {
	 const [cardOnOff, setCardOnOff] = useState(qnaList_reply);
    const [showList, setShowList] = useState(qnaList_reply);
  
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
            <p className="question-mark">Q.</p>
            <p>{item.question}</p>
          </div>
          <div
            className={
                qnaList_reply[index].show
                ? "faq-card-answer"
                : "faq-card-answer faq-card-none"
            }
          >
            <p className="answer-mark">A.</p>
            <p className="FAQ-card-answer">{item.answer}</p>
          </div>
        </div>
      );
    };
  
    useEffect(()=> {
      setShowList(
        qnaList_reply.filter((item) => {
          // if (category === "all") return true;
          // if (category === item.category) return true;
          return true;
        })
      );
    }, []);
  
    return (
      <div>
        {/* <div>faq</div> */}
        {/* <CategoryFilter
          categories={categories}
          category={category}
          setCatecory={setCatecory}
        /> */}
        <div className="fqa-parent" style={{paddingTop:20}}>
          <div className="faq-list">
            {showList.map((item, index) => getQnACard(item, index))}     
          </div>
        </div>
        <div style={{marginBottom:"50px"}}></div>
      </div>
    );
}

export { FaqReply };