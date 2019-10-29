import React from "react";
import { Avatar, Icon } from "antd";
import styled from "styled-components";

const LeftPaddedText = styled.span`
  padding-left: 5px;
  color: ${props => props.color || "default"};
`;

const UserContainer = styled.div`
  padding: 5px;
`;

export const User = ({ name, color }) => {
  return (
    <UserContainer>
      <Avatar icon="user" />
      <LeftPaddedText color={color}>{name}</LeftPaddedText>
      <Icon type="like" />
    </UserContainer>
  );
};
