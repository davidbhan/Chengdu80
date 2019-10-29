import React from "react";
import { connect } from "react-redux";

import { Card } from "antd";
import { Row, Col } from "antd";
import { Typography } from "antd";
import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    name: "John Brown",
    university: "The University of Hong Kong",
    tags: ["stocks", "equity", "trading"]
  },
  {
    key: "2",
    name: "Jim Green",
    university: "South Western University of Finance and Economics",
    tags: ["equity", "trading"]
  },
  {
    key: "3",
    name: "Joe Black",
    university: "University of Perfection",
    tags: ["stocks"]
  }
];

const { Meta } = Card;

function Visualisations({}) {
  return (
    <div>
      <Row>
        <h1>Researcher Profile</h1>
      </Row>
      <Row type={"flex"} justify={"center"} align={"top"}>
        <Col span={6}>
          <Typography.Title>
            <Card
              style={{ width: 160 }}
              cover={
                <img src="data:image/jpeg;base64,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" />
              }
            >
              <div className="icons-list">
                <Row type={"flex"} justify={"center"}>
                  <Col>
                    {/* <img src="data:image/png;base64,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" height="20" width="20" />
            <Badge count={5}>
  <a href="#"/>
</Badge> */}
                  </Col>
                </Row>
              </div>
            </Card>
          </Typography.Title>
        </Col>

        <Col span={12}>
          <Typography.Title>John Doe</Typography.Title>
          The University of XYZ
        </Col>
      </Row>

      <div>
        <div>
          <Row type={"flex"}>
            <Col span={8} offset={1}>
              <Typography.Title>Research Interests</Typography.Title>
            </Col>
          </Row>
          <Row>
            <div>
              <div>
                <Row>
                  <Col offset={2}>
                    <Tag color="#f50">Stocks</Tag>
                    <Tag color="#2db7f5">Equity</Tag>
                    <Tag color="#87d068">Trading</Tag>{" "}
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
        </div>

        <div>
          <Table dataSource={data}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column
              title="University"
              dataIndex="university"
              key="university"
            />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={tags => (
                <span>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </span>
              )}
            />
          </Table>
        </div>
        <div />
      </div>
    </div>
  );
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualisations);
