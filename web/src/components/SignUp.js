import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { auth } from "../actions";

class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.name, this.state.email, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (name, email, password) =>
      dispatch(auth.register(name, email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
