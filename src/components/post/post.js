import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getSession, logout } from "../../ducks/auth";
import "./post.scss";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      input: false,
      comments: [],
      inputText: "",
      likes: []
    };
    this.addComment = this.addComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getCommentCount = this.getCommentCount.bind(this);
    this.getLikes = this.getLikes.bind(this);
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

  getComments() {
    axios.get(`/auth/comment/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
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
  submitComment() {
    this.getComments();
    axios
      .post(`/auth/addComment/${this.props.match.params.id}`, {
        content: this.state.inputText
      })
      .then(res => {
        this.setState({
          comments: [...this.state.comments, res.data[0]]
        });
      });

    this.setState({
      input: false
    });
  }
  getCommentCount() {
    axios
      .get(`/auth/getCommentCount/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          comments: res.data
        });
      });
  }

  getLikes() {
    axios.get(`/auth/getLikes/${this.props.match.params.id}`).then(res => {
      console.log("hit");
      this.setState({
        likes: res.data
      });
      window.location.reload();
    });
  }

  render() {
    console.log(this.state.comments);
    console.log(this.props.username);
    this.state.posts[0] && console.log(this.state.posts[0].comments);
    let mappedComments = this.state.comments.map((val, index) => {
      console.log(val.comments);
      return (
        <div className="post-comments">
          <h4 className="post-author">{val.author} </h4>
          <h3 className="post-content">{val.content}</h3>
          <h3 className="post-heart">♡</h3>
        </div>
      );
    });
    let mappedPosts = this.state.posts.map((val, index) => {
      console.log(val);
      return (
        <div className="post-page">
          <div className="post-lineup">
            <div className="post-top">
              <h3 className="post-username">{val.username}</h3>
              <img src={val.pp} className="pp-" />
            </div>
            <img src={val.image} className="posts" />
            <div className="home-posted-by-">
              <div className="post-emoji">
                <div className="post-page-lineup">
                  <h3 className="user">{val.username}</h3>

                  <div className="comment">
                    <p className="post-page-heart" onClick={this.getLikes}>
                      ♡
                    </p>{" "}
                    <p className="like-number">{val.likes}</p>
                    <p className="post-comment" onClick={this.addComment}>
                      💬
                    </p>
                    <p className="post-comment-number">
                      {/* {this.state.posts[0] && this.state.posts[0].comments} */}
                      {this.state.comments.length}
                    </p>
                  </div>
                </div>
                <div className="heart" />
              </div>
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
            {/* <div className="comment-text">
              <h1 className="user-name">{val.user} </h1>
              <p className="user-text"> {val.comments}</p>
            </div> */}
            <div className="post-pic" />
          </div>
        </div>
      );
    });

    return (
      <div>
        <div>
          <h1> {this.props.match.params.id}</h1>
          {mappedPosts}
        </div>
        <div>{mappedComments}</div>
      </div>
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
