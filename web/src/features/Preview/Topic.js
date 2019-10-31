import React from "react";
import { connect } from "react-redux";
import { Card, List, Row } from "antd";
import { Typography } from "antd";
import { Paper } from "../CurateResults/Paper";
import styled from "styled-components";

const mapStateToProps = state => {
  return {
    topic: state.selection.value
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const PaddedRow = styled(Row)`
  margin-top: 20px;
`;

export const Topic = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ topic }) => {
  return (
    <Card>
      <Typography.Title>{topic.name}</Typography.Title>
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
    </Card>
  );
});
