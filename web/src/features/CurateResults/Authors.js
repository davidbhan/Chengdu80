import React, { useEffect } from "react";
import { Badge, Card, Col, Icon, List, Popover, Row } from "antd";
import { Author } from "./Author";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { AuthorPopoverList } from "./AuthorPopoverList";

const mapStateToProps = state => {
  return {
    authors: state.papers.authors,
    authorsBasket: state.paut.authors,
    loading: state.papers.loading,
    exploreMode: state.paut.exploreMode
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
)(({ authors, authorsBasket, exploreMode, getAuthors, loading }) => {
  useEffect(() => {
    getAuthors();
  }, [loading, authorsBasket]);
  return (
    <Card>
      <Row type={"flex"} justify={"space-between"}>
        <Col>
          <h3 style={{ color: "#08c" }}>
            <Icon
              type="deployment-unit"
              style={{ fontSize: "20px", paddingRight: 5 }}
            />
            {exploreMode ? `Top Authors` : `Liked Authors`}
          </h3>
        </Col>
        {exploreMode && (
          <Col>
            <Popover
              content={<AuthorPopoverList content={authorsBasket} />}
              title="Liked Authors"
            >
              <Badge count={authorsBasket.length} showZero />
            </Popover>
          </Col>
        )}
      </Row>
      <List
        dataSource={exploreMode ? authors : authorsBasket}
        size="small"
        loading={loading}
        renderItem={item => <Author author={item} />}
      />
    </Card>
  );
});
