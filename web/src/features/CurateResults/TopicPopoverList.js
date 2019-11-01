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
    selectTopic: topic => {
      dispatch(selection.renderTopic(topic));
      dispatch(selection.renderTopicTrends(topic));
    }
  };
};

export const TopicPopoverList = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ content, selectTopic }) => {
  return (
    <List
      size={"small"}
      dataSource={content}
      renderItem={item => (
        <ClickableListItem
          key={item}
          onClick={() => {
            selectTopic(item);
          }}
        >
          {item}
        </ClickableListItem>
      )}
    />
  );
});
