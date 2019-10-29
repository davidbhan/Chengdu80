import React from "react";
import { Avatar } from "antd";
import styled from "styled-components";

const LeftPaddedText = styled.span`
  padding-left: 5px;
  color: ${props => props.color || "default"};
`;

const AuthorContainer = styled.div`
  padding: 5px;
`;

export const Author = ({ name, color }) => (
  <AuthorContainer>
    <Avatar icon="user" />
    <LeftPaddedText color={color}>{name}</LeftPaddedText>
  </AuthorContainer>
);
