import React from "react";
import { BsBoxes } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";

const Card = ({
  _id,
  brand,
  description,
  image,
  name,
  price,
  stock,
  setviewModalData,
  isViewModelToggle,
}) => {
  const clickHandler = () => {
    setviewModalData({
      _id,
      brand,
      description,
      image,
      name,
      price,
      stock,
      setviewModalData,
    });
    isViewModelToggle();
  };
  return (
    <div
      onClick={clickHandler}
      className={`cursor-pointer relative h-24 w-full m-1 p-2 ${
        stock <= 0 ? "bg-yellow-100" : "bg-green-50"
      } rounded-md group hover:scale-100 scale-95 transition-all`}
    >
      <div className="w-full">
        <p className="font-semibold ">
          <span className="font-bold text-neutral-800 line-clamp-1">
            {" "}
            {name}
            {" - "} {brand}
          </span>
          <span className="line-clamp-2 text-xs text-gray-600 ml-2 ">
            {description}
          </span>
          <div className="mt-2">
            <span className="ml-2 text-sm">
              <BsBoxes className="inline mr-1 scale-125 text-green-800 font-bold " />{" "}
              {stock}
            </span>
            <span className="text-sm ml-2">
              <LuIndianRupee className="inline text-green-800 " /> {price}
            </span>
          </div>
        </p>
      </div>

      <div
        className="rounded-md transition-all duration-700 
      ease-in-out absolute top-0 left-0 h-full w-full bg-black
      opacity-0 group-hover:opacity-10 hidden group-hover:block"
      >
        <h1 className="text-white"></h1>
      </div>
    </div>
  );
};

export default Card;
