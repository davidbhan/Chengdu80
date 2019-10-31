import React from "react";
import { connect } from "react-redux";
import { Avatar, Card, Col, List, Row } from "antd";
import { Typography } from "antd";
import { Paper } from "../CurateResults/Paper";
import styled from "styled-components";
import { NetworkGraph } from "../../components";

const mapStateToProps = state => {
  return {
    author: state.selection.value
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const PaddedRow = styled(Row)`
  margin-top: 20px;
`;

export const Author = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ author }) => {
  console.log(author);
  return (
    <Card>
      <Row>
        <Col span={6}>
          <Avatar size={64} icon="user" />
        </Col>
        <Col>
          <Typography.Title style={{ fontSize: 24 }}>
            {author.name}
          </Typography.Title>
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
            pageSize: 2
          }}
          dataSource={author.papers}
          renderItem={item => <Paper item={item} />}
        />
      </PaddedRow>
      <NetworkGraph authorData={author} />
    </Card>
  );
});
