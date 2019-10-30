import * as types from "../constants/ActionTypes";

export const renderAuthor = author => {
  return (dispatch, getState) => {
    dispatch({ type: types.SELECT_AUTHOR, payload: { value: author } });
  };
};
