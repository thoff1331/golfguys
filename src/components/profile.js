import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserInfo from "./userinfo";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false,
      profile: []
    };
  }
  componentDidMount() {
    axios.get(`/auth/profile/${this.props.match.id}`).then(res => {
      this.setState({
        profile: res.data
      });
    });
  }

  render() {
    console.log(this.state.profile);
    var mapped = this.state.profile.map((val, index) => {
      return <h3>{val.username}</h3>;
    });

    if (!this.props.auth.username) {
      return (
        <h1 className="protected-profile">
          <Redirect to="/login" />
        </h1>
      );
    }
    return (
      <div>
        <div>
          <div className="lineups-profile">
            <h1 className="bump">
              {" "}
              Welcome to {this.props.auth.username}'s' page{" "}
            </h1>

            <img src={this.props.auth.pp} className="pp" />
            <button
              onClick={() => {
                this.setState({ input: true });
              }}
              className="buttonsu-profile"
            >
              Change Profile Pic
            </button>
            {this.state.input ? (
              <input className="profile-pic-input" placeholder="image url" />
            ) : null}
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
        {mapped}
        <UserInfo />
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Profile);
