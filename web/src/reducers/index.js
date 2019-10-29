import { combineReducers } from "redux";
import auth from "./auth";
import papers from "./papers.js";
import { paut } from "./paut";

const reducers = combineReducers({
  auth,
  papers,
  paut
});

export default reducers;
