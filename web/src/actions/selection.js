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
              authors {
                id
                name
                papers {
                  id
                  authors {
                    id
                    name
                  }
                }
              }
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

export const renderPaper = paper => {
  return (dispatch, getState) => {
    console.log(paper);
    dispatch({ type: types.SELECT_PAPER, payload: { value: paper } });
  };
};
