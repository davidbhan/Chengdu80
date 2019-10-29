import { combineReducers } from "redux";
import auth from "./auth";
import products from "./products";

const reducers = combineReducers({
  auth,
  products
});

export default reducers;
