import React from "react";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { Col, Row } from "antd";
import { Authors } from "./Authors";
import { Topics } from "./Topics";

import SearchResults from "./SearchResults";
import { Author, Paper, Topic } from "../Preview";

class Search extends React.Component {
  componentDidMount() {
    const { query } = this.props.location.state;
    this.props.getSearchPapers(query);
  }

  render() {
    const { papers, loading, previewType } = this.props;
    return (
      <Row type={"flex"} justify={"center"} gutter={16}>
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
        <Col span={10}>
          <SearchResults papers={papers} loading={loading} />
        </Col>
        <Col span={8}>
          {previewType === "AUTHOR" ? <Author /> : null}
          {previewType === "PAPER" ? <Paper /> : null}
          {previewType === "TOPIC" ? <Topic /> : null}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    papers: state.papers.papers,
    loading: state.papers.loading,
    previewType: state.selection.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPapers: () => {
      dispatch(papers.getAllPapers());
    },
    getSearchPapers: query => {
      dispatch(papers.getSearchPapers(query));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
