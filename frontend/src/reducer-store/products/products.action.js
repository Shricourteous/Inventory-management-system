import { createAction } from "../../utils/reducer/reducer.util";
import { PRODUCTSTYPE } from "./products.type";

export const setProductsList = (payload) =>
  createAction(PRODUCTSTYPE.INITIALIZEPRODUCTSTOSTORE, payload);

export const setErrorStatus = (payload) =>
  createAction(PRODUCTSTYPE.SETERROR, payload);

export const setProductSold = (payload) =>
  createAction(PRODUCTSTYPE.SETPRODUCTSOLD, payload);

export const SETLOADINGSTATUS = (payload) =>
  createAction(PRODUCTSTYPE.SETLOADINGSTATUS, payload);
