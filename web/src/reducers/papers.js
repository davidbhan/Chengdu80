import * as types from "../constants/ActionTypes";

const initialState = {
  papers: [],
  loading: false
};

export default function papers(state = initialState, action) {
  switch (action.type) {
    case types.GET_PAPERS:
      return {
        ...state,
        papers: action.payload.papers,
        loading: action.payload.loading
      };
    default:
      return state;
  }
}
