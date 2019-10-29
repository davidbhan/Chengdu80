import React from "react";
import { Card, List } from "antd";
import { Author } from "../../components";

const mockAuthors = ["John Doe", "Jane Doe", "Bob Lee"];

export const Authors = () => (
  <Card>
    <h3>Authors</h3>
    <List
      dataSource={mockAuthors}
      renderItem={item => <Author name={item} />}
    />
  </Card>
);
