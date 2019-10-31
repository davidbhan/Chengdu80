import axios from "axios";
import lodash, { map, join } from "lodash";
import * as types from "../constants/ActionTypes";
import { GET_SEARCH } from "./queries";

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
        authors: lodash.take(
          lodash.differenceWith(
            currentState.papers.authors,
            currentState.paut.authors,
            lodash.isEqual
          ),
          5
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
        topics: lodash.take(
          lodash.difference(
            currentState.papers.topics,
            currentState.paut.topics
          ),
          5
        )
      }
    });
  };
};

export const getSearchPapers = () => {
  return (dispatch, getState) => {
    const current_basket = getState().paut;
    const searchQuery = getState().papers.search_query;

    const authorIds = map(map(current_basket.authors, "id"), lodash.toString);
    const paperIds = map(current_basket.papers, "id");
    const topics = join(current_basket.topics, `","`);

    dispatch({
      type: types.GET_PAPERS,
      payload: { papers: [], loading: true }
    });
    return axios
      .post("/graphql", {
        query: GET_SEARCH(paperIds, authorIds, topics, searchQuery)
      })
      .then(res => {
        const papers = res.data.data.search.papers;
        const authors = res.data.data.search.authors;
        const topics = lodash.uniq(
          lodash.map(
            lodash.flatten(papers.map(({ topics }) => topics[0])),
            "name"
          )
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

export const setQuery = () => {
  return dispatch => {
    const query = localStorage.getItem("query");
    dispatch({
      type: types.SET_SEARCH_QUERY,
      payload: { search_query: query }
    });
  };
};
