import { connect } from "react-redux";
import { Card, Col, Icon, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { map } from "lodash";
import moment from "moment";
import { papers, paut } from "../../actions";

const mapStateToProps = state => {
  return {
    paper: state.selection.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePaper: paper => {
      dispatch(paut.addPaperToLike(paper));
      dispatch(papers.getSearchPapers());
    }
  };
};

const PaddedRow = styled(Row)`
  margin-top: 20px;
`;

const PaddedText = styled(Typography.Text)`
  margin-left: 5px;
  display: inline-table;
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
      {val.institution.name && (
        <Row>
          <Icon type="bank" />
          <PaddedText key={val.institution.id} code>
            {val.institution.name}
          </PaddedText>
        </Row>
      )}
    </PaddedRow>
  ));
};

const topics = items => {
  return map(items, topic => (
    <PaddedText key={topic} code>
      {topic}
    </PaddedText>
  ));
};

export const Paper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ paper, likePaper }) => {
  return (
    <Card>
      <Row type={"flex"}>
        <Col span={22}>
          <Typography.Title level={4}>{paper.title}</Typography.Title>
        </Col>
        <Col span={2}>
          <Icon
            type="like"
            onClick={() => {
              likePaper(paper);
            }}
            style={{ fontSize: "32px", color: "#08c" }}
          />
        </Col>
      </Row>
      {authors(paper.authors)}
      <PaddedRow>
        <Icon type="file-text" code />
        <PaddedText code>Cited in: {paper.citationCount} Papers</PaddedText>
      </PaddedRow>
      <PaddedRow>
        <Icon type="book" />
        {topics([...paper.topics.map(topic => topic.name), ...paper.keywords])}
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
