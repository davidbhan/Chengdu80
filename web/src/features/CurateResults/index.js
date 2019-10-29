import React from "react";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { Col, Row } from "antd";
import { Authors } from "./Authors";
import { Topics } from "./Topics";

import SearchResults from "../../components/SearchResults";

class Search extends React.Component {
  componentDidMount() {
    this.props.getAllPapers();
  }

  render() {
    const {
      papers: { papers },
      loading
    } = this.props;
    return (
      <>
        <Row type={"flex"} justify={"center"} gutter={16}>
          <Col span={4}>
            <Authors />
          </Col>
          <Col span={16}>
            <SearchResults papers={papers} loading={loading} />
          </Col>
          <Col span={4}>
            <Topics />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    papers: state.papers,
    loading: state.papers.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPapers: () => {
      dispatch(papers.getAllPapers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
