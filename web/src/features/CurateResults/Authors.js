import React, { useEffect } from "react";
import { Badge, Card, Col, Icon, List, Popover, Row } from "antd";
import { Author } from "./Author";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { AuthorPopoverList } from "./AuthorPopoverList";

const mapStateToProps = state => {
  return {
    authors: state.papers.authors,
    authorsSelected: state.paut.authors,
    loading: state.papers.loading
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
)(({ authors, authorsSelected, getAuthors, loading }) => {
  useEffect(() => {
    getAuthors();
  }, [loading]);

  return (
    <Card>
      <Row type={"flex"} justify={"space-between"}>
        <Col>
          <h3 style={{ color: "#08c" }}>
            <Icon
              type="deployment-unit"
              style={{ fontSize: "20px", paddingRight: 5 }}
            />
            Top Authors
          </h3>
        </Col>
        <Col>
          <Popover
            content={<AuthorPopoverList content={authorsSelected} />}
            title="Liked authors"
          >
            <Badge count={authorsSelected.length} showZero />
          </Popover>
        </Col>
      </Row>
      <List
        dataSource={authors}
        size="small"
        renderItem={item => <Author author={item} />}
      />
    </Card>
  );
});
