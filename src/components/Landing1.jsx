import React from "react";
import "../styles/Ladning1.css";
import { MagnifyingGlass } from "phosphor-react";
export default function Landing1() {
  return (
    <div className="landing1-main">
      <div className="l1-head">Technical Interview Resources</div>
      <div className="l1-head2">
        Find all technical interview resourcses here
      </div>
      <div className="search-bar">
        <MagnifyingGlass className="serach-icon" />
        <input
          type="text"
          placeholder="Search for resource"
          className="search-input"
        />
      </div>
    </div>
  );
}
