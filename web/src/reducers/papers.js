import * as types from "../constants/ActionTypes";

const initialState = {
  papers: []
};

export default function papers(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return {
        ...state,
        papers: action.papers
      };
    default:
      return state;
  }
}
