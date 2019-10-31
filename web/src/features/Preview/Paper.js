import { connect } from "react-redux";
import { Card, Col, Icon, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { map } from "lodash";
import moment from "moment";

const mapStateToProps = state => {
  return {
    paper: state.selection.value
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const PaddedRow = styled(Row)`
  margin-top: 20px;
`;

const PaddedText = styled(Typography.Text)`
  margin-left: 5px;
`;

const authors = items => {
  return map(items, val => (
    <PaddedRow key={val.id}>
      <Row>
        <Icon type="user" />
        <PaddedText key={val.name} code>
          {val.name}
        </PaddedText>
      </Row>
      <Row>
        <Icon type="bank" />
        <PaddedText key={val.institution.name} code>
          {val.institution.name}
        </PaddedText>
      </Row>
    </PaddedRow>
  ));
};

const topics = items => {
  return map(items, topic => (
    <PaddedText key={topic.name} code>
      {topic.name}
    </PaddedText>
  ));
};

export const Paper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ paper }) => {
  return (
    <Card>
      <Row type={"flex"}>
        <Col>
          <Typography.Title level={4}>{paper.title}</Typography.Title>
        </Col>
      </Row>
      {authors(paper.authors)}
      <PaddedRow>
        <Icon type="book" />
        {topics(paper.topics)}
      </PaddedRow>
      <PaddedRow>
        <Icon type="calendar" />
        <PaddedText>{moment(paper.publishedDate).format("ll")}</PaddedText>
      </PaddedRow>
      <PaddedRow>
        <Typography.Text strong>Abstract</Typography.Text>
        <br />
        <Typography.Text>{paper.abstract}</Typography.Text>
      </PaddedRow>
    </Card>
  );
});
