import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getSession, logout } from "./ducks/auth";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    axios.get(`/auth/post/id${this.props.match.params.id}`).then(res => {
      this.setState({
        posts: res.data
      });
    });
  }
  render() {
    {
      this.state.posts.map((val, index) => {
        return <h1>{val.username}</h1>;
      });
    }
    return (
      <diiv>
        <h1> {this.props.match.params.id}</h1>
      </diiv>
    );
  }
}
const mapStateToProps = reduxState => {
  console.log(reduxState.auth);
  return {
    username: reduxState.auth.username,
    pp: reduxState.auth.pp
  };
};
export default connect(
  mapStateToProps,
  { getSession, logout }
)(Post);
