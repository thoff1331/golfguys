import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { logout, getSession } from "../ducks/auth";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      messages: "",
      image: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handlesubmit(e) {
    //  e.preventDefault();
    Axios.post("/auth/add", {
      messages: this.state.messages,
      image: this.state.image
    });
  }
  render() {
    return (
      <div className="add">
        <h1 className="recent-posts">Recent Posts</h1>
        <form
          onSubmit={this.handlesubmit}
          className="add-form"
          autoComplete="off"
        >
          <label> Share Your Recent Golf Experience </label>
          <textarea
            className="input-add"
            onChange={this.handleChange}
            value={this.state.messages}
            name="messages"
          />
          <label>Add a Picture to your post </label>
          <input
            onChange={this.handleChange}
            value={this.state.image}
            placeholder=" Image URL"
            name="image"
          />
          <br />
          <button className="buttonsu">Post Your Memory</button>
        </form>
      </div>
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
)(Add);
