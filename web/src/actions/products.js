import axios from "axios";

import * as types from "../constants/ActionTypes";

export const getAllProducts = () => {
  return (dispatch, getState) => {
    return axios
      .get("/api/products/")
      .then(res => {
        const products = res.data;
        return dispatch({ type: types.RECEIVE_PRODUCTS, products });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};
