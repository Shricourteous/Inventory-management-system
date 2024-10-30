import React from "react";

const CardOverview = ({ logo = "", bgColor, name = "Use", number }) => {
  return (
    <div className="h-36 w-80 bg-green-100 flex items-center ">
      <div
        className={`h-full w-28 ${bgColor} flex items-center justify-center`}
      >
        <span className="font-extrabold scale-150 text-2xl text-white">
          {logo}
        </span>
      </div>
      <div className="flex w-52 flex-col items-center  justify-center">
        <h2 className="text-3xl font-mono font-semibold">{number}</h2>
        <span className="text-sm font-semibold text-gray-600">{name}</span>
      </div>
    </div>
  );
};

export default CardOverview;
