import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductList } from "../reducer-store/products/products.selector";
import { FaRupeeSign, FaTrashAlt } from "react-icons/fa";
import { selectCartItems } from "../reducer-store/cart/cart.selector";
import { IoAdd } from "react-icons/io5";
import {
  addCartItem,
  removeCartItemById,
} from "../reducer-store/cart/cart.action";
import axios from "axios";

const SalesPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const productList = useSelector(selectProductList);
  const [onFocus, setOnFocus] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    const totalPrice = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    setGrandTotal(totalPrice);
  }, [cartItems]);

  const handleKeyDown = (e, each) => {
    if (e.key === "Enter") {
      const quantity = Number(e.target.value);
      if (quantity > 0 && quantity <= each.stock) {
        dispatch(addCartItem({ ...each, quantity }));
        setOnFocus(null);
        e.target.value = "";
      } else {
        alert("Please enter a valid quantity");
      }
    }
  };

  const handleAddClick = (each) => {
    setOnFocus(each._id);
  };

  const handleSubmitCart = async () => {
    try {
      await axios.post("http://localhost:8000/products/cart", {
        items: cartItems,
      });

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart.");
    }
  };

  // Filter the product list based on the search term
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-full w-full flex flex-col bg-slate-50">
      {/* Search bar */}
      <div className="w-[70vw] p-4 ml-5">
        <input
          type="text"
          placeholder="Search products..."
          className="w-[50vw] p-2 border rounded outline-none select-none selection:scale-105"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-[70vw]">
        {filteredProducts.map((each) => (
          <div
            key={each._id}
            className="flex relative h-28 w-[50vw] bg-white mt-2 border shadow-sm ml-5 mr-20 p-5"
          >
            <div>
              <img
                className="h-full w-20 object-contain"
                src={each.image}
                alt="Image Not Found"
              />
            </div>
            <div className="w-full ml-10 items-center">
              <p className="font-semibold text-gray-700">{each.name}</p>
              <p className="font-semibold text-sm text-gray-700">
                <FaRupeeSign className="inline" />
                {each.price}
              </p>
              {each.stock > 0 ? (
                <p className="text-green-700 mt-2">
                  {each.stock} items left in stock
                </p>
              ) : (
                <p className="text-red-700 mt-2">Out of Stock</p>
              )}
            </div>
            <div className="relative items-center flex">
              {onFocus === each._id ? (
                <span className="right-0 items-center flex h-full ">
                  <input
                    type="number"
                    className="w-20 bg-slate-100 h-10 font-semibold"
                    onKeyDown={(e) => handleKeyDown(e, each)}
                    name={each._id}
                    min="1"
                    max={each.stock}
                    placeholder="Qty"
                    onFocus={() => setOnFocus(each._id)}
                    onBlur={() => setOnFocus(null)}
                  />
                </span>
              ) : (
                <span
                  className="absolute h-full items-center right-10 flex text-3xl cursor-pointer"
                  onClick={() => handleAddClick(each)}
                >
                  {each.stock > 0 && <IoAdd />}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {cartItems[0] && (
        <div className="absolute right-10 w-[28vw] min-h-fit bg-slate-100 ">
          <h2 className="text-3xl text-white bg-green-400 font-semibold w-full flex items-center justify-between pl-10 py-5 rounded-t-2xl">
            <span>Grand Total</span>
            <span className="px-5">{grandTotal.toFixed(2)}</span>
          </h2>
          <h3 className="grid grid-cols-5 text-white bg-green-300 font-semibold w-full rounded-b-md">
            <span className="col-span-2 ml-4">Product</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Amount</span>
          </h3>
          {cartItems.map((each) => (
            <div
              key={each._id}
              className="w-full grid grid-cols-5 h-16 relative items-center"
            >
              <span className="col-span-2 ml-4">{each.name}</span>
              <span>{each.quantity}</span>
              <span>{each.price}</span>
              <span>{(each.price * each.quantity).toFixed(2)}</span>
              <FaTrashAlt
                className="text-red-500 scale-110 absolute right-2 cursor-pointer"
                onClick={() => dispatch(removeCartItemById(each._id))}
              />
            </div>
          ))}
          <div className="flex justify-end p-4">
            <button
              onClick={handleSubmitCart}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Checkout
            </button>
          </div>
          {showSuccessMessage && (
            <div className="fixed bottom-10 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
              Stock checked out successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesPage;
