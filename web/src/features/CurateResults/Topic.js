import { connect } from "react-redux";
import { Icon, List } from "antd";
import React from "react";
import { papers, paut, selection } from "../../actions";
import { ClickableListItem } from "./Author";

const mapStateToProps = state => {
  return {
    topicsSelected: state.paut.topics
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
    renderTopicTrends: topic => {
      dispatch(selection.renderTopicTrends(topic));
    },
    redoSearch: () => {
      dispatch(papers.getSearchPapers());
    }
  };
};

export const Topic = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    topic,
    likeTopic,
    selectTopic,
    renderTopicTrends,
    redoSearch,
    topicsSelected
  }) => {
    return (
      <ClickableListItem
        key={topic}
        onClick={() => {
          selectTopic(topic);
          renderTopicTrends(topic);
        }}
        actions={[
          <Icon
            onClick={() => {
              likeTopic(topic);
              redoSearch();
            }}
            type="like"
            theme={topicsSelected.includes(topic) ? "filled" : "outlined"}
          />
        ]}
      >
        <List.Item.Meta style={{ padding: 0 }} key={topic} title={topic} />
      </ClickableListItem>
    );
  }
);
