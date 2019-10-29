import React from "react";
import { connect } from "react-redux";
import { papers } from "../../actions";
import { Col, Row } from "antd";
import "antd/dist/antd.css";

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
      <div>
        <Row type={"flex"} justify={"center"}>
          <Col span={20}>
            <SearchResults papers={papers} loading={loading} />
          </Col>
        </Row>
      </div>
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
