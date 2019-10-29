import React from "react";
import { Avatar, Icon, List } from "antd";
import styled from "styled-components";

const LeftPaddedText = styled.span`
  padding-left: 5px;
  color: ${props => props.color || "default"};
`;

export const Author = ({ name, color }) => (
  <List.Item key={name} actions={[<Icon type="like" />]}>
    <List.Item.Meta
      title={<a href={""}>{name}</a>}
      avatar={<Avatar icon="user" />}
    />
  </List.Item>
);
