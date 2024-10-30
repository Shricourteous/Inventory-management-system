import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

const middlewares = [logger];

const composedEnhances = compose(applyMiddleware(...middlewares));
export const store = createStore(rootReducer, undefined, composedEnhances);

// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";

// export const store = configureStore({ reducer: rootReducer });
