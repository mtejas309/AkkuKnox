import React, { useState } from "react";
import "../styles/Nav.css";
import logo from "../assets/logo.png";
import { ArrowUpRight, User, List, X } from "phosphor-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navtop">
      <img src={logo} alt="Logo" className="nav-bar-logo" />

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <List size={28} />}
      </div>

      {/* Main Nav Links */}
      <div className={`nav-side-main ${menuOpen ? "open" : ""}`}>
        <div className="nav-side cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:scale-105 transition-transform duration-200">
          <ArrowUpRight />
          <div>Become an Interviewer</div>
          <User />
        </div>

        <div className="cursor-pointer text-gray-600 hover:text-gray-800 hover:scale-105 transition-transform duration-200">
          Features
        </div>

        <div className="cursor-pointer text-gray-600 hover:text-gray-800 hover:scale-105 transition-transform duration-200">
          Pricing
        </div>

        <div className="cursor-pointer text-gray-600 hover:text-gray-800 hover:scale-105 transition-transform duration-200">
          Start a Trial
        </div>

        <div className="login-btn cursor-pointer text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-1 rounded-md transition-colors duration-200">
          Log In
        </div>

        <div className="sign-up cursor-pointer bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors duration-200">
          Sign Up
        </div>
      </div>
    </nav>
  );
}
