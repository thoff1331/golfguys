import React, { Component } from "react";
import axios from "axios";
import Add from "./postmemory";
import { connect } from "react-redux";
import { getSession, logout } from "../ducks/auth";
import { Redirect, Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.deletePost = this.deletePost.bind(this);
  }
  componentDidMount() {
    this.props.getSession();
    axios.get("/auth/messages").then(res => {
      console.log(res.data);
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
  render() {
    if (!this.props.username) {
      return (
        <h1 className="protected-profile">
          <Link to="/login">Please Login </Link>
        </h1>
      );
    } else {
      return (
        <div>
          <div className="home-pp">
            <h3> Welcome, {this.props.username} </h3>
            <img src={this.props.pp} className="pp" />
          </div>
          <Add />
          <div>
            {this.state.messages.map((val, index) => {
              return (
                <div key={index}>
                  <div className="home-posted-by">
                    {" "}
                    <h2>
                      {" "}
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
                  <img src={val.image} alt="" className="posts" />
                  <div className="home-buttons">
                    <h1 key={val.index} /> <h1 className="home-heart">♡</h1>
                    <h6>5</h6>
                    <Link to={`post/${val.id}`} className="comment-link">
                      <h1>💬</h1>
                    </Link>
                    <h6>17</h6>
                    <h1
                      className="home-delete"
                      onClick={() => this.deletePost(val.id)}
                    >
                      ❌
                    </h1>
                  </div>
                  <div className="caption">{val.caption}</div>
                  <div>
                    <div className="lineup" />
                  </div>
                  <div />
                </div>
              );
            })}
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
