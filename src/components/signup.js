import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../ducks/auth";
import logo from "../pics/tall_logo.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pp: "",
      username: "",
      password: "",
      loginAttempt: false
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
    e.preventDefault();
    this.props.signUp(this.state.pp, this.state.username, this.state.password);
    this.setState({
      loginAttempt: true
    });
  }

  render() {
    if (this.props.username) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div className="signup-page">
        <div className="signup-border">
          <div className="sign">
            <form
              onSubmit={this.handleSubmit}
              className="formsu"
              autoComplete="off"
            >
              <img className="logo-log" src={logo} />
              <label>Profile Pic</label>
              <input
                onChange={this.handleChange}
                value={this.state.pp}
                name="pp"
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
              <p>{this.props.error}</p>
              <Link to="/login">
                <p className="nav">Already Registered? Login here</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStatetoProps = reduxState => {
  return {
    username: reduxState.auth.username,
    error: reduxState.auth.error,
    pp: reduxState.auth.pp
  };
};
export default connect(
  mapStatetoProps,
  { signUp }
)(Signup);
