import React from "react";
import { connect } from "react-redux";
import { Card, List, Row, Spin, Typography } from "antd";
import { Paper } from "../CurateResults/Paper";
import styled from "styled-components";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

const mapStateToProps = state => {
  return {
    topic: state.selection.value,
    topicTrends: state.selection.topicTrends,
    trendsLoading: state.selection.topicTrendsLoading
  };
};

const PaddedRow = styled(Row)`
  margin-top: 20px;
`;

export const Topic = connect(mapStateToProps)(
  ({ topic, topicTrends, trendsLoading }) => {
    return (
      <Card>
        <Typography.Title level={3}>{topic.name}</Typography.Title>
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
        <PaddedRow>
          {trendsLoading ? (
            <Spin />
          ) : (
            <AreaChart width={400} height={250} data={topicTrends}>
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
  }
);
