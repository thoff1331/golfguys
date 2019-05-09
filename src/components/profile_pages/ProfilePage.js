import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfo from "./userinfo";
import axios from "axios";
import "./profilepage.scss";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false,
      profile: [],
      posts: []
    };
    this.getPosts = this.getPosts.bind(this);
  }
  componentDidMount() {
    this.getPosts();
    // console.log("hit");
    axios.get(`/auth/profile/page/${this.props.match.params.id}`).then(res => {
      //console.log(res.data);
      this.setState({
        profile: res.data
      });
    });
  }
  getPosts() {
    console.log("hittem");
    axios.get(`/auth/posts/user/${this.props.match.params.id}`).then(res => {
      this.setState({
        posts: res.data
      });
    });
  }

  render() {
    console.log(this.state.posts);
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
    // <div>
    //   <h1> Posts by {this.props.match.params.id}</h1>
    // </div>;
    let mappedPosts = this.state.posts.map((val, index) => {
      return (
        <div className="profile-posts">
          <h3 className="profile-caption">{val.caption}</h3>
          <img src={val.image} />
          <div className="profile-numbers">
            <h6> ♡{val.likes}</h6>
            <h6> 💬{val.comments}</h6>
          </div>
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
        <div>
          <div className="lineups-">
            <h1 className="bump">
              {" "}
              <img src={this.props.match.params.pp} />
              Welcome to {this.props.match.params.id}' s page
              {mapped}
            </h1>
          </div>
        </div>
        <div className="profile-post-by">
          <h1> ~ Posts by {this.props.match.params.id} ~ </h1>
        </div>
        <div className="mapped-post">{mappedPosts}</div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(ProfilePage);
