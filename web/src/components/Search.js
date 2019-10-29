import React from "react";
import { Row, Col } from "antd";
import { Input } from "antd";
import { Typography } from "antd";
import "antd/dist/antd.css";

class Search extends React.Component {
  render() {
    return (
      <div>
        <Row type={"flex"} justify={"center"}>
          <Col span={4} style={{ textAlign: "center" }}>
            <Typography.Title>Dragon</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Input.Search onSearch={() => this.props.history.push("/curate")} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
