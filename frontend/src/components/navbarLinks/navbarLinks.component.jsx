import React from "react";
import { NavLink } from "react-router-dom";

const NavBarLinks = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-green-900 scale-105 transition-all block pl-5 font-semibold bg-forest-400 mt-1 p-2 rounded-lg"
          : "text-gray-800 block pl-5 hover:bg-forest-100 mt-1 p-2 rounded-lg"
      }
    >
      <div className="flex gap-4 items-center">{children}</div>
    </NavLink>
  );
};

export default NavBarLinks;
