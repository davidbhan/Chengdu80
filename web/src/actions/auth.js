import axios from "axios";

import * as types from "../constants/ActionTypes";

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: types.USER_LOADING });

    const token = getState().auth.token;
    const headers = {};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .get("/api/auth/user/", { headers })
      .then(res => {
        dispatch({ type: types.USER_LOADED, user: res.data });
        return res.data;
      })
      .catch(error => {
        const { response } = error;
        console.log(error);
        if (response && (response.status >= 400 && response.status < 500)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};

export const login = (email, password) => {
  return dispatch => {
    return axios
      .post("/api/auth/login/", { email, password })
      .then(res => {
        dispatch({ type: types.LOGIN_SUCCESSFUL, data: res.data });
        return res.data;
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 403 || response.status === 401)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        } else {
          dispatch({ type: types.LOGIN_FAILED, data: response.data });
        }
      });
  };
};

export const register = (name, email, password) => {
  return dispatch => {
    return axios
      .post("/api/auth/register/", { name, email, password })
      .then(res => {
        dispatch({ type: types.REGISTRATION_SUCCESSFUL, data: res.data });
        return res.data;
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 403 || response.status === 401)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        } else {
          dispatch({ type: types.REGISTRATION_FAILED, data: response.data });
        }
      });
  };
};

export const logout = () => {
  return dispatch => {
    return axios
      .post("/api/auth/logout/")
      .then(res => {
        dispatch({ type: types.LOGOUT_SUCCESSFUL });
        return res.data;
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 403 || response.status === 401)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};
