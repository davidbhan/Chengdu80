import React from "react";
import { connect } from "react-redux";

import { Card } from "antd";
import { Row, Col } from "antd";
import { Typography } from "antd";
import { Table, Divider, Tag } from "antd";
import {
  PieChart,
  Pie,
  Sector,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { ForceGraph, ForceGraphNode, ForceGraphLink } from "react-vis-force";
import { Graph } from "react-d3-graph";

// import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
import ReactDOM from "react-dom";
const data_piechart = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const data_barchart = [
  {
    name: "2013",
    stocks: 4,
    trading: 2,
    equity: 6
  },
  {
    name: "2014",
    stocks: 2,
    trading: 5,
    equity: 3
  },
  {
    name: "2015",
    stocks: 8,
    trading: 3,
    equity: 2
  },
  {
    name: "2016",
    stocks: 4,
    trading: 2,
    equity: 2
  },
  {
    name: "2017",
    stocks: 6,
    trading: 4,
    equity: 2
  },
  {
    name: "2018",
    stocks: 4,
    trading: 8,
    equity: 1
  },
  {
    name: "2019",
    stocks: 4,
    trading: 1,
    equity: 0
  }
];
const mockAuthorNetworkData = {
  nodes: [
    { id: "Waqas Hawking" },
    { id: "Utkarsh Turing" },
    { id: "Piyush Baba" },
    { id: "Nitya Curie" },
    { id: "David Doctor" },
    { id: "Han Ji" }
  ],
  links: [
    { source: "Waqas Hawking", target: "Utkarsh Turing" },
    { source: "Waqas Hawking", target: "Piyush Baba" },
    { source: "Waqas Hawking", target: "Nitya Curie" },
    { source: "Waqas Hawking", target: "David Doctor" },
    { source: "Waqas Hawking", target: "Han Ji" }
  ]
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue"
  },
  link: {
    highlightColor: "lightblue"
  }
};

const data1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];
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
      <Row>
        <div style={{ display: "flex" }}>
          <img
            width={90}
            src="data:image/jpeg;base64,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"
          />
          <div style={{ padding: "10px" }}>
            <Typography.Title>John Doe</Typography.Title>
            The University of XYZ
          </div>
        </div>
      </Row>

      <div>
        <br />
        <div>
          <Row type={"flex"}>
            <h2>Research Interests</h2>
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
      <LineChart
        width={500}
        height={300}
        data={data1}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>

      <div>
        <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={mockAuthorNetworkData}
          config={myConfig}
        />
      </div>

      <div>
        <h2>Papers Published in Top Topics</h2>
        <BarChart
          width={500}
          height={300}
          data={data_barchart}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stocks" stackId="a" fill="#8884d8" />
          <Bar dataKey="trading" stackId="a" fill="#82ca9d" />
          <Bar dataKey="equity" stackId="a" fill="red" />
        </BarChart>
      </div>
      <div>
        <PieChart width={400} height={400}>
          <Pie
            data={data_piechart}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
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
