import * as types from "../constants/ActionTypes";

export const addAuthorToLike = author => {
  return dispatch => {
    dispatch({ type: types.ADD_AUTHOR_TO_LIKE, payload: { author: author } });
  };
};

export const addPaperToLike = paper => {
  return dispatch => {
    dispatch({ type: types.ADD_PAPER_TO_LIKE, payload: { paper: paper } });
  };
};

export const addTopicToLike = topic => {
  return dispatch => {
    dispatch({ type: types.ADD_TOPIC_TO_LIKE, payload: { topic: topic } });
  };
};
