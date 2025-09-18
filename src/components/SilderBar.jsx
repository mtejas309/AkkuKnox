import React, { useState } from "react";
import { House, SquaresFour, List, Monitor } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-purple-100 text-purple-700 font-semibold"
      : "hover:bg-gray-100 hover:text-purple-600";

  return (
    <div
      className={`bg-white text-gray-700 border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
        open ? "w-56" : "w-16"
      }`}
    >
      {/* Toggle */}
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="hover:bg-gray-100 rounded-md flex items-center justify-center w-12 h-12"
        >
          <List size={24} />
        </button>
      </div>

      {/* Menu */}
      <nav>
        <ul className="mt-4 space-y-1">
          <li>
            <Link
              to="/"
              className={`flex items-center px-3 py-3 rounded-md transition ${isActive(
                "/"
              )}`}
            >
              <House size={24} />
              {open && <span className="ml-4">Home</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/responsive"
              className={`flex items-center px-3 py-3 rounded-md transition ${isActive(
                "/responsive"
              )}`}
            >
              <Monitor size={24} />
              {open && <span className="ml-4">Responsive Design</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-3 py-3 rounded-md transition ${isActive(
                "/dashboard"
              )}`}
            >
              <SquaresFour size={24} />
              {open && (
                <span className="ml-4">
                  Dashboard{" "}
                  <span className="text-sm text-gray-500">(Redux)</span>
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
