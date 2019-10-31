import * as types from "../constants/ActionTypes";

const initialState = {
  papers: [],
  authors: [],
  topics: [],
  search_query: [],
  loading: false
};

export default function papers(state = initialState, action) {
  switch (action.type) {
    case types.GET_PAPERS:
      return {
        ...state,
        papers: action.payload.papers,
        authors: action.payload.authors,
        topics: action.payload.topics,
        loading: action.payload.loading
      };
    case types.GET_AUTHORS:
      return {
        ...state,
        authors: action.payload.authors
      };
    case types.GET_TOPICS:
      return {
        ...state,
        topics: action.payload.topics
      };
    case types.SET_SEARCH_QUERY:
      return {
        ...state,
        search_query: action.payload.search_query
      };
    default:
      return state;
  }
}
