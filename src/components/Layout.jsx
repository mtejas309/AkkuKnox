import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SilderBar";

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideBar />
        {/* Main content */}
        <main className="flex-1   overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
