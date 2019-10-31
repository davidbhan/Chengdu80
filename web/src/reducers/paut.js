import * as types from "../constants/ActionTypes";

const initialState = {
  papers: [],
  authors: [],
  topics: []
};

export const paut = (state = initialState, action) => {
  console.log(action);
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
    case types.ADD_TOPIC_TO_LIKE:
      return {
        ...state,
        topics: [...state.topics, action.payload.topic]
      };
    default:
      return state;
  }
};
