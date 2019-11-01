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
    previewPaper: paper => {
      dispatch(selection.renderPaper(paper));
    }
  };
};

export const PaperPopoverList = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ content, previewPaper }) => {
  return (
    <List
      size={"small"}
      dataSource={content}
      renderItem={item => (
        <ClickableListItem
          key={item.id}
          onClick={() => {
            previewPaper(item);
          }}
        >
          {item.title}
        </ClickableListItem>
      )}
    />
  );
});
