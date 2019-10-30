import React from "react";
import { Badge, Card, Col, List, Row } from "antd";
import { Author } from "../../components";
import { connect } from "react-redux";

const mockAuthors = [
  "John Doe",
  "Jane Doe",
  "Bob Lee",
  "John Doe",
  "Jane Doe",
  "Bob Lee"
];

const mapStateToProps = state => {
  return {
    authors: state.paut.authors
  };
};

export const Authors = connect(mapStateToProps)(({ authors }) => (
  <Card>
    <Row type={"flex"} justify={"space-between"}>
      <Col>
        <h3>Authors</h3>
      </Col>
      <Col>
        <Badge count={authors.length} showZero />
      </Col>
    </Row>
    <List
      dataSource={mockAuthors}
      renderItem={item => <Author name={item} />}
    />
  </Card>
));
