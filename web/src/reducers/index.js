import { combineReducers } from "redux";
import auth from "./auth";
import papers from "./papers.js";
import { paut } from "./paut";
import { selection } from "./selection";
const reducers = combineReducers({
  auth,
  papers,
  paut,
  selection
});

export default reducers;
