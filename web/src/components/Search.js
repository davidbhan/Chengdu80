import React from "react";
import { Col, Input, Row } from "antd";
import "antd/dist/antd.css";
import logo from "../img/logo.png";
import styled from "styled-components";
import * as paut from "../actions/paut";
import { connect } from "react-redux";
import * as selection from "../actions/selection";

const Image = styled.img`
    width: 200px
    padding: 40px
`;

class Search extends React.Component {
  componentDidMount() {
    const { resetState } = this.props;
    resetState();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          "align-items": "center",
          height: "100%"
        }}
      >
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Image src={logo} />
          </Col>
        </Row>
        <Row style={{ width: "100%" }} type={"flex"} justify={"center"}>
          <Col span={12}>
            <Input.Search
              onSearch={text => {
                sessionStorage.setItem("query", text);
                this.props.history.push("/curate", { query: text });
              }}
              size="large"
              placeholder={"Search anything"}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => {
      dispatch(paut.resetBasket());
      dispatch(selection.resetSelection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
