import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
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

export default SideMenu;
