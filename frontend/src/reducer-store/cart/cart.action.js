import { createAction } from "../../utils/reducer/reducer.util";
import { CARTTYPE } from "./cart.type";

// Initailse cart with items [] of items/objects is passed thru payload
export const setCartItems = (payload) =>
  createAction(CARTTYPE.SETCARTITEMS, payload);

export const addCartItem = (payload) =>
  createAction(CARTTYPE.ADDCARTITEM, payload);

//  payload is if of the specifice object
export const removeCartItemById = (payload) =>
  createAction(CARTTYPE.REMOVECARTITEM, payload);

//  payload is if of the specifice object

//  payload is if of the specifice object
export const incrementCartItemById = (payload) =>
  createAction(CARTTYPE.INCREMENTCARTITEM, payload);

//  payload is if of the specifice object
export const decrementCartItemById = (payload) =>
  createAction(CARTTYPE.DECREMENTCARTITEM, payload);

export const resetCartItems = () => createAction(CARTTYPE.RESETCARTITEMS, "");
