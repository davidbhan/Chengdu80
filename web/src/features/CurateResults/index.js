import React from "react";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { Col, Row } from "antd";
import { Authors } from "./Authors";
import { Topics } from "./Topics";

import SearchResults from "./SearchResults";
import { Author } from "../Preview/Author";
import { Paper } from "../Preview/Paper";

class Search extends React.Component {
  componentDidMount() {
    const { query } = this.props.location.state;
    this.props.getSearchPapers(query);
  }

  render() {
    const { papers, loading, previewType } = this.props;
    return (
      <>
        <Row type={"flex"} justify={"center"} gutter={16}>
          <Col span={16}>
            <Col span={8}>
              <Row>
                <Authors />
              </Row>
              <Row>
                <Topics />
              </Row>
            </Col>
            <Col span={16}>
              <SearchResults papers={papers} loading={loading} />
            </Col>
          </Col>
          <Col span={8}>
            {previewType === "AUTHOR" ? <Author /> : null}
            {previewType === "PAPER" ? <Paper /> : null}
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
