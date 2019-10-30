import React from "react";
import { Badge, Card, Col, List, Row } from "antd";
import { Topic } from "./Topic";
import { connect } from "react-redux";

const mockTopics = [
  "Artificial Intelligence",
  "Malware Detection",
  "Cryptography",
  "Artificial Intelligence",
  "Malware Detection",
  "Cryptography",
  "Artificial Intelligence"
];

const mapStateToProps = state => {
  return {
    topics: state.paut.topics
  };
};

export const Topics = connect(mapStateToProps)(({ topics }) => (
  <Card>
    <Row type={"flex"} justify={"space-between"}>
      <Col>
        <h3>Topics</h3>
      </Col>
      <Col>
        <Badge count={topics.length} showZero />
      </Col>
    </Row>
    <List dataSource={mockTopics} renderItem={item => <Topic topic={item} />} />
  </Card>
));
