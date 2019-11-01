import React from "react";
import { List } from "antd";
import { connect } from "react-redux";
import * as selection from "../../actions/selection";
import styled from "styled-components";

export const ClickableListItem = styled(List.Item)`
  :hover {
    cursor: pointer;
    background-color: #0088cc0d;
    padding: 5px;
  }
`;

const mapStateToProps = dispatch => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    selectAuthor: author_id => {
      dispatch(selection.renderAuthor(author_id));
      dispatch(selection.renderAuthorNetwork(author_id));
    }
  };
};

export const PopoverList = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ content, selectAuthor }) => {
  return (
    <List
      size={"small"}
      dataSource={content}
      renderItem={item => (
        <ClickableListItem
          key={item.id}
          onClick={() => {
            selectAuthor(item.id);
          }}
        >
          {item.name}
        </ClickableListItem>
      )}
    />
  );
});
