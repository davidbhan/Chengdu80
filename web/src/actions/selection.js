import * as types from "../constants/ActionTypes";
import axios from "axios";
import {
  GET_AUTHOR,
  GET_TOPIC,
  GET_TOPIC_TREND,
  GET_AUTHOR_NETWORK
} from "./queries";

export const renderAuthor = author_id => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SELECT_AUTHOR,
      payload: {
        value: null,
        loading: true
      }
    });
    axios
      .post("/graphql", {
        query: GET_AUTHOR(author_id)
      })
      .then(res => {
        dispatch({
          type: types.SELECT_AUTHOR,
          payload: {
            value: {
              ...res.data.data.author
            },
            loading: false
          }
        });
      })
      .catch(err => console.log(err));
  };
};

export const renderAuthorNetwork = author_id => {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_AUTHOR_NETWORK,
      payload: {
        value: {},
        loading: true
      }
    });
    axios
      .post("/graphql", {
        query: GET_AUTHOR_NETWORK(author_id)
      })
      .then(res => {
        dispatch({
          type: types.GET_AUTHOR_NETWORK,
          payload: {
            value: res.data.data.author,
            loading: false
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

export const renderTopicTrends = topic => {
  return (dispatch, getState) => {
    dispatch({ type: types.GET_TOPIC_TRENDS, payload: { loading: true } });
    axios
      .post("/graphql", {
        query: GET_TOPIC_TREND(topic)
      })
      .then(res => {
        dispatch({
          type: types.GET_TOPIC_TRENDS,
          payload: {
            loading: false,
            data: res.data.data.topicAggregateCitations
          }
        });
      })
      .catch(err => console.log(err));
  };
};

export const resetSelection = () => {
  return dispatch => {
    dispatch({ type: types.RESET_SELECTION });
  };
};
