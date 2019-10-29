import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "grommet";
import { AddCircle } from "grommet-icons";

const ProductsTable = ({ products, addItem }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell scope="col" border="bottom">
          Name
        </TableCell>
        <TableCell scope="col" border="bottom" />
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map(product => (
        <TableRow key={product.id}>
          <TableCell scope="row">
            <strong>{product.name}</strong>
          </TableCell>
          <TableCell>
            <Button
              icon={<AddCircle />}
              onClick={() => {
                addItem(product.id);
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ProductsTable;
