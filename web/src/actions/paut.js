import * as types from "../constants/ActionTypes";
import axios from "axios";

export const addAuthorToLike = author => {
  return (dispatch, getState) => {
    dispatch({ type: types.ADD_AUTHOR_TO_LIKE, payload: { author: author } });
    return updateBasket(getState);
  };
};

export const addPaperToLike = paper => {
  return (dispatch, getState) => {
    dispatch({ type: types.ADD_PAPER_TO_LIKE, payload: { paper: paper } });
    return updateBasket(getState);
  };
};

export const addTopicToLike = topic => {
  return (dispatch, getState) => {
    dispatch({ type: types.ADD_TOPIC_TO_LIKE, payload: { topic: topic } });
    return updateBasket(getState);
  };
};

const updateBasket = getState => {
  const current_basket = getState().paut;
  return axios
    .post("/api/curate/update_basket/", current_basket)
    .then(res => {})
    .catch(err => console.log(err));
};
