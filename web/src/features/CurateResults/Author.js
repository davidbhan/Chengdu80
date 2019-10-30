import React from "react";
import { Avatar, Icon, List } from "antd";
import { connect } from "react-redux";
import { paut, papers } from "../../actions";
import * as selection from "../../actions/selection";

const mapStateToProps = state => {
  return {
    authors: state.paut.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeAuthor: author => {
      dispatch(paut.addAuthorToLike(author));
      dispatch(papers.getAuthors());
    },
    selectAuthor: author => {
      dispatch(selection.renderAuthor(author));
    }
  };
};

export const Author = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ author, likeAuthor, selectAuthor }) => {
  return (
    <List.Item
      onClick={() => selectAuthor(author)}
      key={author.name}
      actions={[<Icon onClick={() => likeAuthor(author)} type="like" />]}
    >
      <List.Item.Meta
        title={<p>{author.name}</p>}
        avatar={<Avatar icon="user" />}
      />
    </List.Item>
  );
});
