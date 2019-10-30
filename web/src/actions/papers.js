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

    return dispatch({
      type: types.GET_AUTHORS,
      payload: {
        authors: lodash.differenceWith(
          currentState.papers.authors,
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
    return dispatch({
      type: types.GET_TOPICS,
      payload: {
        topics: lodash.difference(
          currentState.papers.topics,
          currentState.paut.topics
        )
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
          authors {
            name
          }
          topics {
            name
          }
          }
          }
        }`
      })
      .then(res => {
        const papers = res.data.data.search.papers;
        const authors = lodash.take(
          lodash.uniq(lodash.flatten(lodash.map(papers, "authors"))),
          5
        );
        const topics = lodash.take(
          lodash.uniq(
            lodash.map(lodash.flatten(lodash.map(papers, "topics")), "name")
          ),
          5
        );
        return dispatch({
          type: types.GET_PAPERS,
          payload: {
            papers: papers,
            authors: authors,
            topics: topics,
            loading: false
          }
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
