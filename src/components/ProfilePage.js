import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfo from "./userinfo";
import axios from "axios";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false,
      profile: []
    };
  }
  componentDidMount() {
    console.log("hit");
    axios.get(`/auth/profile/${this.props.match.params.id}`).then(res => {
      this.setState({
        profile: res.data
      });
    });
  }

  render() {
    console.log(this.props.match);
    console.log(this.state.profile);
    var mapped = this.state.profile.map((val, index) => {
      return (
        <div className="profile-page-values">
          <div className="profile-page-top">
            <img src={val.pp} className="profile-picture" />
          </div>
          <h3>Favorite Course: {val.course}</h3>
          <h3>Handicap: {val.handicap}</h3>
          <h3>Rounds Per Year: {val.rounds}</h3>
          <h3>Career Hole in One: {val.career}</h3>
        </div>
      );
    });

    if (!this.props.auth.username) {
      return (
        <h1 className="protected-profile">
          <Link to="/login">Please Login </Link>
        </h1>
      );
    }
    return (
      <div className="profile-page-default">
        <img src={this.props.match.params.pp} />
        <div>
          <div className="lineups-">
            <h1 className="bump">
              {" "}
              Welcome to {this.props.match.params.id}' s page {mapped}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(ProfilePage);
