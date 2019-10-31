import * as types from "../constants/ActionTypes";
import axios from "axios";
import { GET_AUTHOR, GET_TOPIC } from "./queries";

export const renderAuthor = author => {
  return (dispatch, getState) => {
    axios
      .post("/graphql", {
        query: GET_AUTHOR(author.id)
      })
      .then(res => {
        dispatch({
          type: types.SELECT_AUTHOR,
          payload: {
            value: {
              ...res.data.data.author,
              id: author.id,
              name: author.name
            }
          }
        });
      })
      .catch(err => console.log(err));
  };
};

export const renderPaper = paper => {
  return (dispatch, getState) => {
    dispatch({ type: types.SELECT_PAPER, payload: { value: paper } });
  };
};

export const renderTopic = topic => {
  return dispatch => {
    axios
      .post("/graphql", {
        query: GET_TOPIC(topic)
      })
      .then(res => {
        dispatch({
          type: types.SELECT_TOPIC,
          payload: {
            value: {
              ...res.data.data.topic,
              name: topic
            }
          }
        });
      })
      .catch(err => console.log(err));
  };
};
