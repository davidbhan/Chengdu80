import * as types from "../constants/ActionTypes";

export const toggleExploreMode = () => {
  return dispatch => {
    dispatch({ type: types.TOGGLE_EXPLORE_MODE });
  };
};

export const addAuthorToLike = author => {
  return (dispatch, getState) => {
    dispatch({ type: types.ADD_AUTHOR_TO_LIKE, payload: { author: author } });
  };
};

export const addPaperToLike = paper => {
  return (dispatch, getState) => {
    dispatch({ type: types.ADD_PAPER_TO_LIKE, payload: { paper: paper } });
  };
};

export const addTopicToLike = topic => {
  return (dispatch, getState) => {
    dispatch({ type: types.ADD_TOPIC_TO_LIKE, payload: { topic: topic } });
  };
};
