import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfo from "./userinfo";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false
    };
  }
  render() {
    if (!this.props.auth.username) {
      return (
        <h1>
          <Link to="/login">Please Login </Link>
        </h1>
      );
    }
    return (
      <div>
        <div>
          <div className="lineups-">
            <h1 className="bump">Welcome, {this.props.auth.username}</h1>
            <img src={this.props.auth.pp} className="pp" />
            <button
              onClick={() => {
                this.setState({ input: true });
              }}
              className="buttonsu"
            >
              Change Profile Pic
            </button>
            {this.state.input ? <input placeholder="image url" /> : null}
            <div />
            {this.state.input ? (
              <button
                onClick={() => {
                  this.setState({ input: false });
                }}
                className="buttonsu"
              >
                Submit
              </button>
            ) : null}
          </div>
        </div>
        <UserInfo />
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Profile);
