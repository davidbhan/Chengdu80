import axios from "axios";

import * as types from "../constants/ActionTypes";

export const getAllPapers = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_PAPERS,
      payload: { papers: [], loading: true }
    });
    return axios
      .get("/api/papers/")
      .then(res => {
        const papers = res.data;
        return dispatch({
          type: types.GET_PAPERS,
          payload: { papers: papers, loading: false }
        });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};