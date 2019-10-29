import axios from "axios";

import * as types from "../constants/ActionTypes";

export const addAuthorToLike = author => {
  return dispatch => {
    dispatch({ type: types.ADD_AUTHOR_TO_LIKE, payload: { author: author } });
  };
};
