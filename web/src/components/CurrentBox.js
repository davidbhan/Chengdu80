import React from "react";
import { connect } from "react-redux";
import { products } from "../actions";
import { Row, Col } from "antd";
import { Input } from "antd";
import { Typography } from "antd";
import "antd/dist/antd.css";

import ProductsTable from "./ProductsTable";

class CurrentBox extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const {
      products: { products }
    } = this.props;
    return (
      <div>
        <Row type={"flex"} justify={"center"}>
          <Col span={4} style={{ textAlign: "center" }}>
            <Typography.Title>Dragon</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Input.Search />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(products.getAllProducts());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentBox);
