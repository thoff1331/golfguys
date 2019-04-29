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
      password: ""
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
      .catch(err => alert("incorrect Creditentials"));
    this.setState({
      username: "",
      password: ""
    });
  }

  render() {
    console.log(this.props.auth.username);
    if (this.props.auth.username) {
      return <Redirect to="/profile" push={true} />;
    }
    return (
      <div>
        <h1 className="formli">Login</h1>

        <form onSubmit={this.handleSubmit} className="formli">
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
