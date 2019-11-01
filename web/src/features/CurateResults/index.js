import React from "react";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { Col, Row, Icon } from "antd";
import { Authors } from "./Authors";
import { Topics } from "./Topics";

import SearchResults from "./SearchResults";
import { Author, Paper, Topic } from "../Preview";
import { Redirect } from "react-router-dom";

class Search extends React.Component {
  componentDidMount() {
    this.props.setSearchQuery();
    this.props.getSearchPapers();
  }

  render() {
    const { papers, loading, previewType } = this.props;
    if (sessionStorage.getItem("query") === null) {
      return <Redirect to={"/"} />;
    }
    return (
      <>
        <Row type={"flex"} justify={"space-between"} gutter={16}>
          <Col span={6}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Authors />
              </Col>
              <Col span={24}>
                <Topics />
              </Col>
            </Row>
          </Col>
          <Col span={10} style={{ height: "100vh" }}>
            <SearchResults papers={papers} loading={loading} />
          </Col>
          <Col
            span={8}
            style={{
              borderLeft: "solid 8px #cccccc"
            }}
          >
            {!previewType ? (
              <div
                style={{
                  height: "100%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "aliceblue"
                }}
              >
                <Icon type="rocket" style={{ fontSize: 64 }} />
                <br />
                <p>click on an author, paper or topic to get started</p>
              </div>
            ) : null}
            {previewType === "AUTHOR" ? <Author /> : null}
            {previewType === "PAPER" ? <Paper /> : null}
            {previewType === "TOPIC" ? <Topic /> : null}
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    papers: state.papers.papers,
    loading: state.papers.loading,
    previewType: state.selection.type,
    search_query: state.selection.search_query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPapers: () => {
      dispatch(papers.getAllPapers());
    },
    getSearchPapers: query => {
      dispatch(papers.getSearchPapers());
    },
    setSearchQuery: () => {
      dispatch(papers.setQuery());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
