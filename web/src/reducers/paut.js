import * as types from "../constants/ActionTypes";

const initialState = {
  papers: [],
  authors: [],
  topics: []
};

export const paut = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_AUTHOR_TO_LIKE:
      return {
        ...state,
        authors: [...state.authors, action.payload.author]
      };
    case types.ADD_PAPER_TO_LIKE:
      return {
        ...state,
        papers: [...state.papers, action.payload.paper]
      };
    default:
      return state;
  }
};
