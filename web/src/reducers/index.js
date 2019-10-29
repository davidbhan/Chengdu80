import { combineReducers } from "redux";
import auth from "./auth";
import papers from "./papers.js";

const reducers = combineReducers({
  auth,
  papers
});

export default reducers;
