import React from "react";
import { connect } from "react-redux";
import { Avatar, Card, Col, List, Row, Spin, Icon } from "antd";
import { Typography } from "antd";
import { Paper } from "../CurateResults/Paper";
import styled from "styled-components";
import { NetworkGraph } from "../../components";
import { uniq } from "lodash";
import * as selection from "../../actions/selection";
import { papers, paut } from "../../actions";

const mapStateToProps = state => {
  return {
    author: state.selection.value,
    authorNetwork: state.selection.authorNetwork,
    authorNetworkLoading: state.selection.authorNetworkLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeAuthor: author => {
      dispatch(paut.addAuthorToLike(author));
      dispatch(papers.getAuthors());
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

export const Author = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ author, authorNetwork, authorNetworkLoading, likeAuthor }) => {
  return (
    <Card>
      {author && (
        <Row type={"flex"} align={"middle"}>
          <Col span={6}>
            {author.image ? (
              <Avatar size={64} src={author.image} />
            ) : (
              <Avatar size={64} icon="user" />
            )}
          </Col>
          <Col span={16}>
            <Typography.Title level={4}>{author.name}</Typography.Title>
          </Col>
          <Col span={2}>
            <Icon
              type="like"
              onClick={() => {
                likeAuthor(author);
              }}
              style={{ fontSize: "32px", color: "#08c" }}
            />
          </Col>
        </Row>
      )}
      {author && author.institution && author.institution.name ? (
        <PaddedRow>
          <Icon type="bank" />
          <PaddedText key={author.institution.id} code>
            {author.institution.name}
          </PaddedText>
        </PaddedRow>
      ) : null}
      {author && author.prestigeScore ? (
        <PaddedRow>
          <Icon type="area-chart" />
          <PaddedText code>{author.prestigeScore} points</PaddedText>
        </PaddedRow>
      ) : null}
      {author && author.citationCount ? (
        <PaddedRow>
          <Icon type="number" />
          <PaddedText code>Cited {author.citationCount} times</PaddedText>
        </PaddedRow>
      ) : null}
      {author && author.papers ? (
        <PaddedRow>
          <Icon type="solution" />
          <PaddedText code>{author.papers.length} research papers</PaddedText>
        </PaddedRow>
      ) : null}
      {author && author.interests ? (
        <PaddedRow>
          <Icon type="solution" />
          {uniq(author.interests).map(val => (
            <PaddedText key={val} code>
              {val}
            </PaddedText>
          ))}
        </PaddedRow>
      ) : null}
      {author && (
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
      )}
      {authorNetworkLoading && <Spin />}
      {authorNetwork && authorNetwork.papers && (
        <NetworkGraph authorData={authorNetwork} />
      )}
    </Card>
  );
});
