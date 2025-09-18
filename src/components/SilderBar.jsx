import React, { useState } from "react";
import { House, SquaresFour, List, Monitor } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // helper for active state
  const isActive = (path) =>
    location.pathname === path ? "bg-purple-600 text-white font-semibold" : "";

  return (
    <div
      className={`bg-neutral-900 text-gray-300 h-screen flex flex-col transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle */}
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center w-12 h-12"
        >
          <List size={24} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="mt-4 space-y-1">
          {/* Home */}
          <li>
            <Link
              to="/"
              className={`flex items-center px-3 py-3 rounded-md hover:bg-neutral-800 transition ${isActive(
                "/"
              )}`}
            >
              <House size={24} className="flex-shrink-0" />
              {open && <span className="ml-4">Home</span>}
            </Link>
          </li>

          {/* Responsive Website */}
          <li>
            <Link
              to="/responsive"
              className={`flex items-center px-3 py-3 rounded-md hover:bg-neutral-800 transition ${isActive(
                "/responsive"
              )}`}
            >
              <Monitor size={24} className="flex-shrink-0" />
              {open && <span className="ml-4">Responsive Design</span>}
            </Link>
          </li>

          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-3 py-3 rounded-md hover:bg-neutral-800 transition ${isActive(
                "/dashboard"
              )}`}
            >
              <SquaresFour size={24} className="flex-shrink-0" />
              {open && (
                <span className="ml-4">
                  Dashboard{" "}
                  <span className="text-sm text-gray-400">(Redux)</span>
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
