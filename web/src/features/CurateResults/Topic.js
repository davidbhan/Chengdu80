import { connect } from "react-redux";
import { Icon, List } from "antd";
import React from "react";
import { paut } from "../../actions";

const mapStateToProps = state => {
  return {
    topics: state.paut.topics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeTopic: topic => {
      dispatch(paut.addTopicToLike(topic));
    }
  };
};

export const Topic = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ topic, color, likeTopic, topics }) => {
  return (
    <List.Item
      key={topic}
      actions={[<Icon onClick={() => likeTopic(topic)} type="like" />]}
    >
      <List.Item.Meta key={topic} title={<p>{topic}</p>} />
    </List.Item>
  );
});
