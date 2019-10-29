import React from "react";
import { connect } from "react-redux";
import { Box, Heading } from "grommet";

import { products } from "../actions";
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
      <Box>
        <Box direction="row" pad="medium" justify="around">
          <Box pad="medium">
            <Heading level="4" margin="small">
              Research Papers
            </Heading>
            <ProductsTable products={products} addItem={() => {}} />
          </Box>
        </Box>
      </Box>
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
