import React from "react";
import { Button, Icon, Layout, Menu, Row, Switch } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { auth, paut } from "../actions";
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
    this.setState({ collapsed });
  };

  render() {
    const {
      children,
      user,
      logout,
      exploreMode,
      toggleExploreMode
    } = this.props;
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
                <span>Home</span>
              </Link>
            </Menu.Item>
          </Menu>
          <SideBarItem type="flex" justify="center">
            <span style={{ color: "white", paddingRight: 5 }}>Mode:</span>
            <Switch
              defaultChecked
              checkedChildren={
                <span>
                  <Icon
                    type="bulb"
                    theme="filled"
                    style={{ paddingRight: 4, color: "yellow" }}
                  />
                  {!collapsed && <span>Explore</span>}
                </span>
              }
              unCheckedChildren={
                <span>
                  <Icon
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                    style={{ paddingRight: 4 }}
                  />
                  {!collapsed && <span>Look Back</span>}
                </span>
              }
              onChange={() => toggleExploreMode()}
              style={{ backgroundColor: exploreMode ? "#0088cc" : "green" }}
              checked={exploreMode}
            />
          </SideBarItem>
        </Sider>
        <Layout style={{ backgroundColor: "white" }}>{children}</Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    exploreMode: state.paut.exploreMode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
    toggleExploreMode: () => dispatch(paut.toggleExploreMode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
