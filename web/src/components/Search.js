import React from "react";
import { Col, Input, Row, Typography } from "antd";
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
            <Input.Search
              onSearch={text => {
                localStorage.setItem("query", text);
                this.props.history.push("/curate", { query: text });
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
