import * as types from "../constants/ActionTypes";

const initialState = {
  products: []
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
    default:
      return state;
  }
}
