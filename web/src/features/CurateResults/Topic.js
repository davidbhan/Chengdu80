import { connect } from "react-redux";
import { Icon, List } from "antd";
import React from "react";
import { papers, paut } from "../../actions";
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
    },
    redoSearch: () => {
      dispatch(papers.getSearchPapers());
    }
  };
};

export const Topic = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ topic, likeTopic, selectTopic, redoSearch }) => {
  return (
    <ClickableListItem
      key={topic}
      onClick={() => {
        selectTopic(topic);
        redoSearch();
      }}
      actions={[<Icon onClick={() => likeTopic(topic)} type="like" />]}
    >
      <List.Item.Meta style={{ padding: 0 }} key={topic} title={topic} />
    </ClickableListItem>
  );
});
