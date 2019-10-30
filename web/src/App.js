import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { auth } from "./actions";
import ponyApp from "./reducers";

import AppBar from "./components/AppBar";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Search from "./components/Search";
import Visualisations from "./components/Visualisations";
import { CurateResults } from "./features";

let store = createStore(ponyApp, composeWithDevTools(applyMiddleware(thunk)));

class RootContainerComponent extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.props.auth.isLoading) {
            return <em>Loading...</em>;
          } else if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/auth/login" />;
          } else {
            return <ChildComponent {...props} />;
          }
        }}
      />
    );
  };

  AppBarLayout = () => {
    return (
      <AppBar>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path={"/curate"} component={CurateResults} />
          <Route exact path={"/visualize"} component={Visualisations} />
          <Route component={NotFound} />
        </Switch>
      </AppBar>
    );
  };

  AuthLayout = props => {
    return (
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    );
  };

  render() {
    const { AppBarLayout, AuthLayout } = this;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <Route path="/" component={AppBarLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};

let RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainerComponent);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
