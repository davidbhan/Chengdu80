import * as types from "../constants/ActionTypes";
import axios from "axios";

export const renderAuthor = author => {
  return (dispatch, getState) => {
    axios
      .post("/graphql", {
        query: `query {
          author(id: "${author.id}"){
            id
            papers{
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
        dispatch({
          type: types.SELECT_AUTHOR,
          payload: {
            value: {
              id: author.id,
              name: author.name,
              papers: res.data.data.author.papers
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
        query: `query {
          topic(name: "${topic}"){
            name
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
        dispatch({
          type: types.SELECT_TOPIC,
          payload: {
            value: {
              name: topic,
              papers: res.data.data.topic.papers
            }
          }
        });
      })
      .catch(err => console.log(err));
  };
};
