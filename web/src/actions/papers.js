import axios from "axios";
import lodash from "lodash";
import * as types from "../constants/ActionTypes";

export const getAllPapers = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_PAPERS,
      payload: { papers: [], loading: true }
    });
    return axios
      .post("/api/papers/")
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

export const getAuthors = () => {
  return (dispatch, getState) => {
    const currentState = getState();

    const mockAuthors = [
      { name: "Jane Eik" },
      { name: "John Doe" },
      { name: "Jane Teen" },
      { name: "Bob Chaar" }
    ];

    return dispatch({
      type: types.GET_AUTHORS,
      payload: {
        authors: lodash.differenceWith(
          mockAuthors,
          currentState.paut.authors,
          lodash.isEqual
        )
      }
    });
  };
};

export const getTopics = () => {
  return (dispatch, getState) => {
    const currentState = getState();
    const mockTopics = [
      "Artificial Intelligence",
      "Computational & Synthetic Biology",
      "Computer Architecture",
      "Computer Graphics, Vision, Animation, and Game Science",
      "Computing for Development",
      "Data Science",
      "Data Management and Visualization",
      "Human Computer Interaction"
    ];
    return dispatch({
      type: types.GET_TOPICS,
      payload: {
        topics: lodash.difference(mockTopics, currentState.paut.topics)
      }
    });
  };
};

export const getSearchPapers = searchQuery => {
  return dispatch => {
    dispatch({
      type: types.GET_PAPERS,
      payload: { papers: [], loading: true }
    });
    return axios
      .post("/graphql", {
        query: `query {
          search(query: "${searchQuery}"){
          papers{
          title
          }
          }
        }`
      })
      .then(res => {
        const papers = res.data.data.search.papers;
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
