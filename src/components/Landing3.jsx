import React from "react";
import { Key, ArrowRight, Stack } from "phosphor-react";
import "../styles/landing3.css";
function Landing3() {
  return (
    <div className="l3-main">
      <div className="l3-sub-main">
        <div className="l3-main-heading">Security is your top priority</div>
        <div className="l3-main-subheading">
          Intervue serves startups to fortune 500 companies with enterprise
          grade security baked in by design
        </div>
      </div>

      <div className="l3-card-row">
        {/* Card 1 */}
        <div className="l3-card">
          <Key weight="fill" className="key" />
          <div className="l3-m-text">Security</div>
          <div className="l3-m2-text">
            Protecting your data at every layer is fundamental to how Intervue
            works
          </div>
          <ArrowRight className="arrow" />
        </div>

        {/* Card 2 */}
        <div className="l3-card">
          <Stack weight="fill" className="key" />
          <div className="l3-m-text">Compliances</div>
          <div className="l3-m2-text">
            Enterprise grade compliance commitments where we have established
            controls to adhere to those commitments
          </div>
          <ArrowRight className="arrow" />
        </div>

        {/* Card 3 + 4 stacked */}
        <div className="l3-card-stack">
          <div className="l3-card half">
            <i className="key">🚀</i>
            <div className="l3-m-text">Intervue for Startups</div>
            <ArrowRight className="arrow" />
          </div>
          <div className="l3-card half">
            <i className="key">🌐</i>
            <div className="l3-m-text">Intervue for Enterprises</div>
            <ArrowRight className="arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing3;
