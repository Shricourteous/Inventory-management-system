import { combineReducers } from "redux";

import { ProductsReducer } from "./products/products.reducer";
import { EmployeesReducer } from "./employees/employees.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  products: ProductsReducer,
  employees: EmployeesReducer,
  cart: cartReducer,
});
