import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import {
  addCartItem,
  addCartItemById,
  decrementCartItemById,
  incrementCartItemById,
  removeCartItemById,
  setCartItems,
} from "../../reducer-store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../reducer-store/user/user.selector";
import { selectCartItems } from "../../reducer-store/cart/cart.selector";

const CounterButton = ({ productDetails }) => {
  // TODO:
  // Redux
  // increase based on ID
  const dispatch = useDispatch();
  const [available, setAvailable] = useState(false);
  // const { productId } = productDetails
  // const count = 0
  const [count, setcount] = useState(0);
  const cart = useSelector(selectCartItems);

  const { productId } = "productDetails";

  // TODO : THere must be a bug here (foreach?)
  useEffect(() => {
    cart?.map((each) => {
      if (each.productId === productId) {
        setcount(each.count);
        setAvailable(true);
      }
    });
    // console.log("mount count", count);

    // return () => {
    //   console.log("unmount count", count);
    // };
  }, [cart, count, productId]);

  //   Bugs may arise - direct count values gives previous state so added +1
  const incrementCount = () => {
    dispatch(incrementCartItemById(productId));
    // TODO : Updates not updating the DB

    console.log(count);
  };

  const decrementCount = () => {
    console.log(count);
    if (count > 1) {
      dispatch(decrementCartItemById(productId));

      console.log("decrement");
    } else {
      dispatch(removeCartItemById(productId));
      setAvailable(false);
    }
    // updateProductInCart(user.uid, productId, { ...productDetails })
  };

  const addToCart = () => {
    dispatch(addCartItem({ ...productDetails, count: 1 }));
  };

  return (
    <div className="select-none flex overflow-hidden justify-between items-center h-10 w-36 border rounded-lg border-forest-500">
      {available ? (
        <>
          {" "}
          {/* Counter Button */}
          <span
            onClick={incrementCount}
            className="flex justify-center h-10 bg-forest-400 text-white w-8 items-center"
          >
            <HiPlus />
          </span>
          <span className="font-bold">{count}</span>
          <span
            onClick={decrementCount}
            className="flex justify-center h-10 bg-forest-400 text-white w-8 items-center"
          >
            <HiMinus />
          </span>
        </>
      ) : (
        <span
          onClick={addToCart}
          className=" flex justify-center h-10 w-36 items-center font-bold text-forest-700 hover:bg-forest-300  hover:text-white transition-all"
        >
          Add To Cart
        </span>
      )}
    </div>
  );
};

export default CounterButton;
