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
    //   axios.get(`/auth/profile/${this.props.match.id}`).then(res => {
    //     this.setState({
    //       profile: res.data
    //     });
    //   });
    // }
  }

  render() {
    var mapped = this.state.profile.map((val, index) => {
      return (
        <di>
          <h3>{val.username}</h3>
          <img src={val.pp} />
        </di>
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
      <div>
        <img src={this.props.match.params.pp} />
        <div>
          <div className="lineups-">
            <h1 className="bump">
              {" "}
              Welcome to {this.props.match.params.id}' s page{" "}
            </h1>
          </div>
        </div>
        {mapped}
        <UserInfo />
      </div>
    );
  }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(ProfilePage);
