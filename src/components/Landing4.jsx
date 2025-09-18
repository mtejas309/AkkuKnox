import React from "react";
import "../styles/landing4.css";
import { Key, ArrowRight, Stack } from "phosphor-react";
import image from "../assets/image.png";
function Landing4() {
  return (
    <div className="l4-main">
      <div className="l4-m1">
        <img src={image} className="i-l4" />
      </div>
      <div className="l4-m2">
        <div className="l41">
          After interviewing candidates on Intervue, we were able to convert at
          least 5% of people from our application base to hires.
        </div>

        <div>
          <div className="l42">Niket Gupta</div>
          <div className="l43">Group head of talent acquisition, Yubi</div>
        </div>

        <div className="l44">Seę more customer stories</div>
      </div>
    </div>
  );
}

export default Landing4;
