import React from "react";
import SideMenu from "./SideMenu";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const ContentContainer = styled.div`
  padding: 15px;
  height: 100%;
  width: 100%;
`;

class AppBar extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <SideMenu>
        <ContentContainer>{children}</ContentContainer>
      </SideMenu>
    );
  }
}

export default withRouter(AppBar);
