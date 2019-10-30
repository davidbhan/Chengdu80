import * as types from "../constants/ActionTypes";
import axios from "axios";

export const renderAuthor = author => {
  return (dispatch, getState) => {
    axios
      .post("/graphql", {
        query: `query {
          author(id: "${author.id}"){
            papers{
              title
            }
          }}`
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
