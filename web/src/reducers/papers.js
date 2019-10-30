import * as types from "../constants/ActionTypes";

const initialState = {
  papers: [],
  authors: [],
  topics: [],
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
    default:
      return state;
  }
}
