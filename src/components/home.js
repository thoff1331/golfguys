import React, { Component } from "react";
import axios from "axios";
import Add from "./postmemory";
import { connect } from "react-redux";
import { getSession } from "../ducks/auth";
import { Link } from "react-router-dom";

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
    console.log("hitt");
    axios.get("/auth/logout");
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Link to="/login">
          <button onClick={this.logout}>Logout</button>
        </Link>
        <div className="home-pp">
          <h3> Welcome, {this.props.username} </h3>
          <img src={this.props.pp} className="pp" />
        </div>
        <Add />
        <div>
          {this.state.messages.map((val, index) => {
            console.log(val.pp);
            return (
              <div>
                <div className="home-posted-by">
                  <h2> Posted By: {val.username}</h2>
                  <img src={val.pp} className="pp" />
                </div>
                <img src={val.image} alt="" className="posts" />
                <h1 key={val.index} />{" "}
                <div className="caption">
                  {val.username}: {val.messages}
                </div>
                <button>💚</button>
                <button>💬</button>
                <button onClick={() => this.deletePost(val.id)}>❌</button>
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
const mapStateToProps = reduxState => {
  return {
    username: reduxState.auth.username,
    pp: reduxState.auth.pp
  };
};
export default connect(
  mapStateToProps,
  { getSession }
)(Home);
