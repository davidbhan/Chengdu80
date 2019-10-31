import React from "react";
import { connect } from "react-redux";
import { Avatar, Card, Col, List, Row, Spin, Icon } from "antd";
import { Typography } from "antd";
import { Paper } from "../CurateResults/Paper";
import styled from "styled-components";
import { NetworkGraph } from "../../components";

const mapStateToProps = state => {
  return {
    author: state.selection.value,
    authorNetwork: state.selection.authorNetwork,
    authorNetworkLoading: state.selection.authorNetworkLoading
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
  display: inline-table;
`;

export const Author = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ author, authorNetwork, authorNetworkLoading }) => {
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
      {author.institution.name && (
        <PaddedRow>
          <Icon type="bank" />
          <PaddedText key={author.institution.id} code>
            {author.institution.name}
          </PaddedText>
        </PaddedRow>
      )}
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
      {authorNetworkLoading && <Spin />}
      {authorNetwork.papers && <NetworkGraph authorData={authorNetwork} />}
    </Card>
  );
});
