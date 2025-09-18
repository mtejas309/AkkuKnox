import React from "react";
import "../styles/Landing2.css";

const cardData = [
  {
    difficulty: "easy",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "medium",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "hard",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "easy",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "medium",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "hard",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "easy",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "medium",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "hard",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "easy",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "medium",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
  {
    difficulty: "hard",
    title: "Data Structure and Algorithms",
    description: "Design a free food app",
    details:
      "We created this guide after speaking with our community of interviewers, which includes over 100 current and former Amazon engineers, as well as our corpus of mock interviews",
  },
];

export default function Landing2() {
  return (
    <div className="cards-main">
      {cardData.map((card, index) => (
        <div className="card1-main" key={index}>
          <div className="card1-sub">
            <div className={`card1-sub2 ${card.difficulty}`}>
              {card.difficulty.charAt(0).toUpperCase() +
                card.difficulty.slice(1)}
            </div>
            <div className="card1-sub3">{card.title}</div>
          </div>
          <div className="cards2-sub">
            <div className="cards2-sub1">{card.description}</div>
            <div className="cards2-sub2">{card.details}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
