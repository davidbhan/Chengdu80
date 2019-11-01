import React, { useEffect } from "react";
import { Badge, Card, Col, Icon, List, Popover, Row } from "antd";
import { Topic } from "./Topic";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { TopicPopoverList } from "./TopicPopoverList";

const mapStateToProps = state => {
  return {
    topics: state.papers.topics,
    topicsSelected: state.paut.topics,
    loading: state.papers.loading
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
)(({ topics, topicsSelected, getTopics, loading }) => {
  useEffect(() => {
    getTopics();
  }, [loading]);

  return (
    <Card>
      <Row type={"flex"} justify={"space-between"}>
        <Col>
          <h3 style={{ color: "green" }}>
            <Icon type="number" style={{ fontSize: "20px", paddingRight: 5 }} />
            Relevant Topics
          </h3>
        </Col>
        <Col>
          <Popover
            content={<TopicPopoverList content={topicsSelected} />}
            title="Liked topics"
          >
            <Badge count={topicsSelected.length} showZero />
          </Popover>
        </Col>
      </Row>
      <List dataSource={topics} renderItem={item => <Topic topic={item} />} />
    </Card>
  );
});
