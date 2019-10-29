import React from "react";
import { Box, Heading, Button, Text, Image, ResponsiveContext } from "grommet";
import { Login, Logout } from "grommet-icons";
import { connect } from "react-redux";
import { NavLink, Link, withRouter } from "react-router-dom";

import { auth } from "../actions";
import Logo from "../logo.svg";

const sidebarItems = [
  {
    text: "Research Papers",
    route: "/",
    public: true
  }
];

class AppBar extends React.Component {
  render() {
    const { children, user, location } = this.props;
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <div>
            <Box
              tag="header"
              direction="row"
              align="center"
              justify="between"
              background="brand"
              pad={{ left: "medium", right: "small", vertical: "xsmall" }}
              elevation="medium"
              style={{ zIndex: "1" }}
            >
              <Box direction="row" align="center">
                <Box direction="row" align="center" margin={{ right: "small" }}>
                  <Image
                    src={Logo}
                    style={{ width: 50, height: 50 }}
                    margin={{ right: "xsmall" }}
                  />
                  {size !== "small" && (
                    <Heading level="3" margin="none">
                      Dragon
                    </Heading>
                  )}
                </Box>
                <Box direction="row">
                  {sidebarItems.map(
                    item =>
                      (item.public || user) && (
                        <NavLink
                          exact
                          key={item.route}
                          to={item.route}
                          style={{ textDecoration: "none" }}
                        >
                          <Text
                            margin="xsmall"
                            color={
                              (location.pathname === item.route &&
                                "accent-1") ||
                              "light-1"
                            }
                          >
                            {item.text}
                          </Text>
                        </NavLink>
                      )
                  )}
                </Box>
              </Box>
              {user && (
                <Box direction="row">
                  <Text alignSelf="center" margin="xsmall">
                    {user.name}
                  </Text>
                  <Button
                    icon={<Logout />}
                    label="Logout"
                    onClick={this.props.logout}
                  />
                </Box>
              )}
              {!user && (
                <Link to="/auth/login">
                  <Button icon={<Login />} label="Login" />
                </Link>
              )}
            </Box>
            <Box pad="small" border={{ color: "brand", size: "large" }}>
              {children}
            </Box>
          </div>
        )}
      </ResponsiveContext.Consumer>
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
