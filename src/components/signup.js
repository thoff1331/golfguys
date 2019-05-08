import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../ducks/auth";
import logo from "../pics/tall_logo.png";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pp: "",
      username: "",
      password: "",
      loginAttempt: false,
      file: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleFileUpload(e) {
    this.setState({ file: e.target.files });
  }
  submitFile = (event, id) => {
    console.log("hitt");
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post("/auth/addProfilePic", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response.data.Location);
        this.setState(
          {
            image: response.data.Location
          },
          () => {
            this.handlesubmit();
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

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
                onChange={this.handleFileUpload}
                value={this.state.pp}
                name="pp"
                type="file"
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
