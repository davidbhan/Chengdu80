import axios from "axios";
import lodash, { map } from "lodash";
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

export const getSearchPapers = () => {
  return (dispatch, getState) => {
    const current_basket = getState().paut;
    const searchQuery = getState().papers.search_query;

    const authorIds = map(map(current_basket.authors, "id"), lodash.toString);
    const paperIds = map(current_basket.papers, "id");
    const topics = current_basket.topics;

    console.log(paperIds, authorIds, topics, searchQuery);

    dispatch({
      type: types.GET_PAPERS,
      payload: { papers: [], loading: true }
    });
    return axios
      .post("/graphql", {
        query: `query {
          search(query: "${searchQuery}", paperIds: [${paperIds}], authorIds: [${authorIds}], topics: [${topics}]){
            papers {
              id
              title
              abstract
              authors {
                id
                name
                institution{
                  id
                  name
                }
              }
              topics {
                name
              }
              publishedDate
            }
          }
        }`
      })
      .then(res => {
        const papers = res.data.data.search.papers;
        console.log(papers);
        const authors = lodash.take(
          lodash.uniqWith(
            lodash.flatten(papers.map(({ authors }) => authors[0])),
            lodash.isEqual
          ),
          5
        );
        const topics = lodash.take(
          lodash.uniq(
            lodash.map(
              lodash.flatten(papers.map(({ topics }) => topics[0])),
              "name"
            )
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

export const setQuery = () => {
  return dispatch => {
    const query = localStorage.getItem("query");
    dispatch({
      type: types.SET_SEARCH_QUERY,
      payload: { search_query: query }
    });
  };
};
