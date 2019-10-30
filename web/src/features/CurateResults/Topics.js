import React, { useEffect } from "react";
import { Badge, Card, Col, List, Row } from "antd";
import { Topic } from "./Topic";
import { connect } from "react-redux";
import { papers } from "../../actions";

const mapStateToProps = state => {
  return {
    topics: state.papers.topics,
    topicsSelected: state.paut.topics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTopics: () => {
      dispatch(papers.getTopics());
    }
  };
};

export const Topics = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ topics, topicsSelected, getTopics }) => {
  useEffect(() => {
    getTopics();
  });

  return (
    <Card>
      <Row type={"flex"} justify={"space-between"}>
        <Col>
          <h3>Topics</h3>
        </Col>
        <Col>
          <Badge count={topicsSelected.length} showZero />
        </Col>
      </Row>
      <List dataSource={topics} renderItem={item => <Topic topic={item} />} />
    </Card>
  );
});
