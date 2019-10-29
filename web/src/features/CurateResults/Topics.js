import React from "react";
import { Card, List } from "antd";

const mockTopics = [
  "Artificial Intelligence",
  "Malware Detection",
  "Cryptography"
];

export const Topics = () => (
  <Card>
    <h3>Topics</h3>
    <List
      dataSource={mockTopics}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  </Card>
);
