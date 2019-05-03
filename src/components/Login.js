import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../ducks/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props
      .login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        alert("incorrect Creditentials");
      });
    this.setState({
      username: "",
      password: "",
      login: true
    });
  }

  render() {
    if (this.props.auth.username) {
    }

    return (
      <div>
        <h1 className="login-button">Login</h1>

        <form
          onSubmit={this.handleSubmit}
          className="formli"
          autoComplete="off"
        >
          <label>Username </label>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
          />

          <label>Password</label>
          <input
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
          />

          <button className="buttonsu">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { login }
)(Login);
