import React from "react";
import { connect } from "react-redux";
import { Card, Col, Icon, List, Row, Spin, Typography } from "antd";
import { Paper } from "../CurateResults/Paper";
import styled from "styled-components";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { papers, paut } from "../../actions";

const mapStateToProps = state => {
  return {
    topic: state.selection.value,
    topicTrends: state.selection.topicTrends,
    trendsLoading: state.selection.topicTrendsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeTopic: topic => {
      dispatch(paut.addTopicToLike(topic));
      dispatch(papers.getSearchPapers());
    }
  };
};

const PaddedRow = styled(Row)`
  margin-top: 20px;
`;

export const Topic = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ topic, topicTrends, trendsLoading, likeTopic }) => {
  return (
    <Card>
      <Row type={"flex"}>
        <Col span={22}>
          <Typography.Title level={4}>{topic.name}</Typography.Title>
        </Col>
        <Col span={2}>
          <Icon
            type="like"
            onClick={() => {
              likeTopic(topic.name);
            }}
            style={{ fontSize: "32px", color: "#08c" }}
          />
        </Col>
      </Row>
      <PaddedRow>
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 4
          }}
          dataSource={topic.papers}
          renderItem={item => <Paper item={item} />}
        />
      </PaddedRow>
      <PaddedRow type={"flex"} justify={"center"} align={"middle"}>
        {trendsLoading ? (
          <Spin />
        ) : (
          <AreaChart width={350} height={300} data={topicTrends}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" />
            <YAxis />
            <Area
              type="monotone"
              dataKey="citations"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        )}
      </PaddedRow>
    </Card>
  );
});
