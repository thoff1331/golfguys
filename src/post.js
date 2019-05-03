import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getSession, logout } from "./ducks/auth";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      comments: [],
      input: false,
      comments: [],
      inputText: ""
    };
    this.addComment = this.addComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getComments = this.getComments.bind(this);
  }
  componentDidMount() {
    this.getComments();
    this.props.getSession();
    axios.get(`/auth/post/${this.props.match.params.id}`).then(res => {
      this.setState({
        posts: res.data
      });
    });
  }
  addComment() {
    this.setState({
      input: true
    });
  }
  submitComment() {
    this.setState({
      input: false
    });
  }
  getComments() {
    axios.get(`/auth/comment/$${this.props.match.params.id}`).then(res => {
      this.setState({
        comments: res.data
      });
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    var mapped = this.state.posts.map((val, index) => {
      return (
        <div className="post-page">
          <div className="post-lineup">
            <div className="post-top">
              <h3 className="post-username">{val.username}</h3>
              <img src={val.pp} className="pp-" />
            </div>
            <img src={val.image} />
            <div className="home-posted-by-">
              <div className="user">
                <h3>{val.username}</h3>
              </div>
              <div className="comment">
                <p onClick={this.addComment}>💬</p>
              </div>
              <p>💚</p>

              <div className="heart" />
            </div>
            <div>
              <h1 className="caption">{val.caption}</h1>
              {this.state.input ? (
                <input
                  onChange={this.handleChange}
                  placeholder="Add Your Comment here"
                  name="inputText"
                />
              ) : null}
              {this.state.input ? (
                <button onClick={this.submitComment} className="buttonsu">
                  Submit
                </button>
              ) : null}
            </div>
            <div className="comment-text">
              <h1 className="user-name">{val.user} </h1>
              <p className="user-text"> {val.comments}</p>
            </div>
            <div className="post-pic" />
          </div>
        </div>
      );
    });

    return (
      <diiv>
        <h1> {this.props.match.params.id}</h1>
        {mapped}
      </diiv>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    username: reduxState.auth.username,
    pp: reduxState.auth.pp
  };
};
export default connect(
  mapStateToProps,
  { getSession, logout }
)(Post);
