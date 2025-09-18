import React from "react";
import { List } from "phosphor-react"; // optional mobile toggle

function NavBar() {
  return (
    <nav className="bg-black text-white px-4 py-3 flex items-center justify-between shadow-md">
      {/* Unique gradient text logo */}
      <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Devfolio 🚀
      </h1>
    </nav>
  );
}

export default NavBar;
