import { connect } from "react-redux";
import { Icon, List } from "antd";
import React from "react";
import { paut } from "../../actions";
import { ClickableListItem } from "./Author";
import * as selection from "../../actions/selection";

const mapStateToProps = state => {
  return {
    topics: state.paut.topics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeTopic: topic => {
      dispatch(paut.addTopicToLike(topic));
    },
    selectTopic: topic => {
      dispatch(selection.renderTopic(topic));
    }
  };
};

export const Topic = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ topic, likeTopic, selectTopic }) => {
  return (
    <ClickableListItem
      key={topic}
      onClick={() => selectTopic(topic)}
      actions={[<Icon onClick={() => likeTopic(topic)} type="like" />]}
    >
      <List.Item.Meta style={{ padding: 0 }} key={topic} title={topic} />
    </ClickableListItem>
  );
});
