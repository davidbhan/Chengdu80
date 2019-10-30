import React, { useEffect } from "react";
import { Badge, Card, Col, List, Row } from "antd";
import { Author } from "../../components";
import { connect } from "react-redux";
import { papers } from "../../actions";

const mapStateToProps = state => {
  return {
    authors: state.papers.authors,
    authorsSelected: state.paut.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthors: () => {
      dispatch(papers.getAuthors());
    }
  };
};

export const Authors = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ authors, authorsSelected, getAuthors }) => {
  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <Card>
      <Row type={"flex"} justify={"space-between"}>
        <Col>
          <h3>Authors</h3>
        </Col>
        <Col>
          <Badge count={authorsSelected.length} showZero />
        </Col>
      </Row>
      <List
        dataSource={authors}
        renderItem={item => <Author author={item} />}
      />
    </Card>
  );
});
