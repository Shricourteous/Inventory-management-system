import React from "react";

const NavBarComponent = () => {
  return (
    <>
      <nav className="select-none sticky top-0 z-10 h-16 w-full  bg-green-100 flex items-center pb-1">
        <div className="flex ml-20 text-xl outline-double px-2 py-2 box-border rounded-sm shadow-emerald-300 underline-offset-8 underline  text-green-700 font-semibold">
          {" "}
          <p className="rotate-12">Stock</p>
          <p className="-rotate-12">Viewer</p>{" "}
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;
