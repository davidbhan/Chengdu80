import React from "react";
import { Avatar, Icon, List } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { paut } from "../../actions";

const LeftPaddedText = styled.span`
  padding-left: 5px;
  color: ${props => props.color || "default"};
`;

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
      <List.Item.Meta
        title={<a href={""}>{name}</a>}
        avatar={<Avatar icon="user" />}
      />
    </List.Item>
  );
});
