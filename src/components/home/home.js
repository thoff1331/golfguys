import React, { Component } from "react";
import axios from "axios";
import Add from "../../components/addMemory/postmemory";
import { connect } from "react-redux";
import { getSession, logout } from "../../ducks/auth";
import { Redirect, Link } from "react-router-dom";
import "../../components/home/home.scss";
import { file } from "@babel/types";
import "./home.scss";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      comments: [],
      likes: [],
      caption: "",
      image: "",
      file: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    // this.getCommentCountHome = this.getCommentCountHome.bind(this);
    this.getLikes = this.getLikes.bind(this);
    // this.getCommentCount = this.getCommentCount.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
    axios.get("/auth/messages").then(res => {
      this.setState({
        messages: res.data
      });
    });
  }
  deletePost(id) {
    axios
      .delete(`/auth/delete/${id}`, {
        data: {
          id: id
        }
      })
      .then(response => {
        this.setState({
          messages: response.data
        });
      });
  }
  logout = () => {
    this.props.logout();
    // axios.get("/auth/logout").then(response => {
    //   console.log(response);
    //   this.props.history.push("/login");
    // });
    // };
  };
  // req.params.match
  // getCommentCountHome() {
  //   axios
  //     .get(`auth/getCommentCountHome/${this.props.match.params.id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({
  //         comments: res.data
  //       });
  //     });
  // }

  getLikes(id) {
    console.log("button");
    axios.get(`/auth/getLikes/${id}`).then(res => {
      console.log(res.data);
      this.setState({
        messages: res.data
      });
      // window.location.reload();
    });
  }
  handlesubmit() {
    axios
      .post("/auth/add", {
        caption: this.state.caption,
        image: this.state.image
      })
      .then(res => {
        console.log(res);
        this.setState({
          messages: res.data,
          caption: "",
          image: ""
        });
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleFileUpload(e) {
    this.setState({ file: e.target.files });
    console.log(e.target);
  }
  submitFile = (event, id) => {
    console.log("hitt");
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post("/auth/addimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response.data.Location);
        this.setState(
          {
            image: response.data.Location,
            file: null
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

  render() {
    console.log(this.state.messages);
    console.log(this.props.match.params.id);
    if (!this.props.username) {
      return (
        <h1 className="protected-profile">
          <Redirect to="/login" />
        </h1>
      );
    } else {
      return (
        <div className="background">
          <div className="home-page">
            <div className="home-pp">
              <h3> Welcome, {this.props.username} </h3>
              <img src={this.props.pp} className="pp" />
            </div>
            <div className="add-home">
              <form
                onSubmit={this.submitFile}
                className="add-form"
                autoComplete="off"
              >
                <label> Share Your Recent Golf Experience </label>
                <input
                  className="input-add"
                  onChange={this.handleChange}
                  value={this.state.caption}
                  name="caption"
                />
                <label>Add a Picture to your post </label>
                <input
                  className="input-home"
                  onChange={this.handleFileUpload}
                  // value={this.state.file}
                  placeholder=" Image URL"
                  name="image"
                  type="file"
                />

                <br />
                <button className="buttonsu-home">Post</button>
              </form>
              <div className="recent-div">
                <h1 className="recent-posts"> ~ Recent Posts ~</h1>
              </div>
            </div>
            <div className="bottom-border" />
            <div className="mobileSecondPage">
              <div className="secondPage">
                {this.state.messages.map((val, index) => {
                  console.log(val.comments);
                  return (
                    <div className="papa">
                      <div key={index} className="bosses">
                        <div className="baby-boss">
                          <h2>
                            Posted By:{" "}
                            <Link
                              className="profile-link-home"
                              to={{
                                pathname: `profile-page/${val.username}`,
                                state: {
                                  id: val.username
                                }
                              }}
                            >
                              {val.username}
                            </Link>
                          </h2>
                          <img src={val.pp} className="pp" />
                        </div>
                        <div className="big-boss">
                          <img src={val.image} alt="" className="posts" />
                          <h1 key={val.index} />
                          <div className="papa-buttons">
                            <h1
                              className="like-number"
                              onClick={e => this.getLikes(val.id)}
                            >
                              ♡
                            </h1>
                            <h4 className="likes-mobile">{val.likes}</h4>
                            <Link
                              to={`post/${val.id}`}
                              className="comment-link"
                            >
                              <h1 className="comment-link-mobile">💬</h1>
                            </Link>
                            <h4 className="comment-mobile-number">
                              {val.comments}
                            </h4>

                            <h1
                              className="home-delete"
                              onClick={() => this.deletePost(val.id)}
                            >
                              𝐗
                            </h1>
                          </div>
                        </div>

                        <div className="lineup" />
                      </div>
                      <div className="comment-caption">{val.caption}</div>

                      <div />
                    </div>
                    //{" "}
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
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
)(Home);
