import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Col, Icon, Row } from "antd";
import { auth } from "../actions";
import SideMenu from "./SideMenu";

class AppBar extends React.Component {
  render() {
    const { children, user, logout } = this.props;
    return (
      <div>
        <SideMenu>
          <Row type={"flex"} justify={"end"} style={{ padding: 20 }}>
            <Col span={4}>
              {user ? (
                <Button onClick={logout}>
                  <Icon type="user" />
                  Logout
                </Button>
              ) : (
                <Button href={"/auth/login"}>
                  <Icon type="user" />
                  Login
                </Button>
              )}
            </Col>
          </Row>
          {children}
        </SideMenu>
      </div>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppBar)
);
