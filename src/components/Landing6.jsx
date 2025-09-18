import React, { useState } from "react";
import "../styles/landing6.css";
import { Plus, X } from "phosphor-react";

const faqData = [
  {
    question: "How do I schedule an interview?",
    answer:
      "You can schedule an interview through your dashboard under 'Appointments'.",
  },
  {
    question: "What if I miss the interview?",
    answer:
      "You can reschedule missed interviews from the same dashboard panel.",
  },
  {
    question: "Are interviews recorded?",
    answer: "Yes, for quality and training purposes, interviews are recorded.",
  },
];

function Landing6() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="l6-main">
      <div className="l6-m1">
        <div className="l6-m1-t1">FAQ'S</div>
        <div className="l6-m1-t2">
          Here are frequently asked questions to clear all your doubts
        </div>
        <div className="l6-m11">
          <div className="l6-m1-t3">Still have doubts?</div>
          <div className="l6-m1-t4">📞 Talk to representative</div>
        </div>
      </div>

      <div className="l6-m2">
        {faqData.map((item, index) => (
          <div key={index}>
            <div className="l6-m22" onClick={() => toggleAnswer(index)}>
              <div>{item.question}</div>
              {openIndex === index ? <X /> : <Plus />}
            </div>
            {openIndex === index && (
              <div className="l6-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing6;
