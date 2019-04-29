import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../ducks/auth";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      button: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.props.signUp();
  // }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    console.log();
    e.preventDefault();
    this.props.signUp(
      this.state.email,
      this.state.username,
      this.state.password
    );
  }

  render() {
    if (this.props.auth.error) {
      alert("user name already taken");
    } else {
      // return <Redirect to="/profile" />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="formsu">
          <label>Email</label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            name="email"
          />
          <label>UserName</label>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
          />
          <label>PassWord</label>
          <input
            // type="password"
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
          />
          <br />
          <button className="buttonsu">Join The Club</button>
          <Link to="/login">
            <p className="nav">Already Registered? Login here</p>
          </Link>
        </form>
      </div>
    );
  }
}
const mapStatetoProps = reduxState => reduxState;

export default connect(
  mapStatetoProps,
  { signUp }
)(Signup);
