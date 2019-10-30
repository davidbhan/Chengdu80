import React from "react";
import { Avatar, Icon, List } from "antd";
import { connect } from "react-redux";
import { paut } from "../../actions";

const mapStateToProps = state => {
  return {
    authors: state.paut.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeAuthor: author => {
      dispatch(paut.addAuthorToLike(author));
    }
  };
};

export const Author = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ name, color, likeAuthor, authors }) => {
  return (
    <List.Item
      key={name}
      actions={[<Icon onClick={() => likeAuthor(name)} type="like" />]}
    >
      <List.Item.Meta title={<p>{name}</p>} avatar={<Avatar icon="user" />} />
    </List.Item>
  );
});
