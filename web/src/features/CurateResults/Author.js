import React from "react";
import { Avatar, Icon, List } from "antd";
import { connect } from "react-redux";
import { paut, papers } from "../../actions";
import { truncate } from "lodash";
import * as selection from "../../actions/selection";
import styled from "styled-components";

const ClickableListItem = styled(List.Item)`
  :hover {
    cursor: pointer;
    background-color: #0088cc0d;
    padding: 5px;
  }
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
    <ClickableListItem
      key={author.name}
      onClick={() => selectAuthor(author)}
      actions={[<Icon onClick={() => likeAuthor(author)} type="like" />]}
    >
      <List.Item.Meta
        style={{ padding: 0 }}
        title={author.name}
        description={truncate(author.institution.name, { length: 18 })}
        avatar={<Avatar icon="user" />}
      />
    </ClickableListItem>
  );
});
