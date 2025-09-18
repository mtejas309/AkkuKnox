import React from "react";
import "../styles/landing5.css";
import p2 from "../assets/p2.png";
import { Key, ArrowRight, Stack } from "phosphor-react";
function Landing5() {
  return (
    <div>
      <div className="l5-heading">Explore more product in intervue </div>
      <div className="l5-main">
        <div className="l5-main-1">
          <img src={p2} className="l5-img" />
          <div className="l">
            <div className="l5-text-2">On Demand</div>
            <div className="l5-text-1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              nihil amet perspiciatis alias rem quasi, mollitia placeat,
              voluptatem porro eius ab totam perferendis aliquam tempora. Iusto
              voluptatibus sequi nulla magnam?
            </div>
            <div className="l-arrow">
              <div className="l5-text3">Know More</div>
              <ArrowRight className="l-s" />
            </div>
          </div>
        </div>
        <div className="l5-main-1">
          <img src={p2} className="l5-img" />
          <div className="l">
            <div className="l5-text-2">On Demand</div>
            <div className="l5-text-1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              nihil amet perspiciatis alias rem quasi, mollitia placeat,
              voluptatem porro eius ab totam perferendis aliquam tempora. Iusto
              voluptatibus sequi nulla magnam?
            </div>
            <div className="l-arrow">
              <div className="l5-text3">Know More</div>
              <ArrowRight className="l-s" />
            </div>
          </div>
        </div>
        <div className="l5-main-1">
          <img src={p2} className="l5-img" />
          <div className="l">
            <div className="l5-text-2">On Demand</div>
            <div className="l5-text-1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              nihil amet perspiciatis alias rem quasi, mollitia placeat,
              voluptatem porro eius ab totam perferendis aliquam tempora. Iusto
              voluptatibus sequi nulla magnam?
            </div>
            <div className="l-arrow">
              <div className="l5-text3">Know More</div>
              <ArrowRight className="l-s" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing5;
