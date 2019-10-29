import React from "react";
import { Layout, Menu, Button, Icon, Row } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { auth } from "../actions";

import { Author } from "./";
import { User } from "./User";

const { Sider } = Layout;

const SideBarItem = styled(Row)`
  margin-top: 10px;
`;

const TransparentButton = styled(Button)`
  background-color: transparent !important;
  color: white !important;
`;

class SideMenu extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { children, user, logout } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{ paddingTop: 5 }}
        >
          {user ? (
            <>
              {!collapsed && (
                <SideBarItem type="flex" justify="center">
                  <User name={user.name} color="white" />
                </SideBarItem>
              )}
              <SideBarItem type="flex" justify="center">
                <TransparentButton onClick={logout}>
                  <Icon type="logout" />
                  {!collapsed && "Logout"}
                </TransparentButton>
              </SideBarItem>
            </>
          ) : (
            <SideBarItem type="flex" justify="center">
              <TransparentButton href={"/auth/login"}>
                <Icon type="login" />
                {!collapsed && "Login"}
              </TransparentButton>
            </SideBarItem>
          )}
          <div
            style={{
              borderTop: "0.5px solid #9ea7ae",
              margin: "20px 15px 15px"
            }}
          />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="search">
              <Link to={"/"}>
                <Icon type="search" />
                <span>Search</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="visualize">
              <Link to={"/visualize"}>
                <Icon type="line-chart" />
                <span>Visualize</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ backgroundColor: "white" }}>{children}</Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
