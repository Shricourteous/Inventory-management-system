import { PRODUCTSTYPE } from "./products.type";

const INITIAL_STATE = {
  productsList: [],
  productsold: [],
  loading: true,
  err: null,
};

export const ProductsReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case PRODUCTSTYPE.INITIALIZEPRODUCTSTOSTORE:
      return {
        ...state,
        productsList: [...payload],
      };

    case PRODUCTSTYPE.SETPRODUCTSOLD:
      return {
        ...state,
        productsold: [...payload],
      };
    case PRODUCTSTYPE.SETERROR:
      return {
        ...state,
        err: payload,
      };
    case PRODUCTSTYPE.SETLOADINGSTATUS:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
