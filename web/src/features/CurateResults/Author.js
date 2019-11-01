import React from "react";
import { Avatar, Icon, List } from "antd";
import { connect } from "react-redux";
import { paut, papers } from "../../actions";
import { truncate } from "lodash";
import * as selection from "../../actions/selection";
import styled from "styled-components";

export const ClickableListItem = styled(List.Item)`
  :hover {
    cursor: pointer;
    background-color: #0088cc0d;
    padding: 5px;
  }
`;

const mapStateToProps = state => {
  return {
    authorsSelected: state.paut.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeAuthor: author => {
      dispatch(paut.addAuthorToLike(author));
      dispatch(papers.getAuthors());
    },
    selectAuthor: author_id => {
      dispatch(selection.renderAuthor(author_id));
      dispatch(selection.renderAuthorNetwork(author_id));
    },
    redoSearch: () => {
      dispatch(papers.getSearchPapers());
    }
  };
};

export const Author = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ author, authorsSelected, likeAuthor, selectAuthor, redoSearch }) => {
  return (
    <ClickableListItem
      key={author.name}
      onClick={() => selectAuthor(author.id)}
      actions={[
        <Icon
          onClick={() => {
            likeAuthor(author);
            redoSearch();
          }}
          type="like"
          theme={
            authorsSelected
              .map(authorSelected => authorSelected.id)
              .includes(author.id)
              ? "filled"
              : "outlined"
          }
        />
      ]}
    >
      <List.Item.Meta
        style={{ padding: 0 }}
        title={author.name}
        description={truncate(author.institution.name, { length: 18 })}
        avatar={
          author.image ? <Avatar src={author.image} /> : <Avatar icon="user" />
        }
      />
    </ClickableListItem>
  );
});
