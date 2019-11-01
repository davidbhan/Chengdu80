import React, { useEffect } from "react";
import { List, Row, Col, Card, Icon, Badge, Popover } from "antd";
import { Paper } from "./Paper";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { PaperPopoverList } from "./PaperPopoverList";

const mapStateToProps = state => {
  return {
    papers: state.papers.papers,
    papersSelected: state.paut.papers,
    loading: state.papers.loading,
    exploreMode: state.paut.exploreMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSearchPapers: query => {
      dispatch(papers.getSearchPapers());
    }
  };
};

const SearchResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ papers, loading, getSearchPapers, exploreMode, papersSelected }) => {
  useEffect(() => {
    getSearchPapers();
  }, []);
  return (
    <Card>
      <Row type={"flex"} justify={"space-between"}>
        <Col>
          <h3>
            <Icon type="copy" style={{ fontSize: "20px", paddingRight: 5 }} />
            {exploreMode ? "Suggested Papers" : "Liked Papers"}
          </h3>
        </Col>
        {exploreMode && (
          <Col>
            <Popover
              content={<PaperPopoverList content={papersSelected} />}
              title="Liked Papers"
            >
              <Badge count={papersSelected.length} showZero />
            </Popover>
          </Col>
        )}
      </Row>
      <List
        loading={loading}
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 7
        }}
        dataSource={exploreMode ? papers : papersSelected}
        renderItem={paper => <Paper item={paper} />}
      />
    </Card>
  );
});

export default SearchResults;
