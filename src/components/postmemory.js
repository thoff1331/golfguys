import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { logout, getSession } from "../ducks/auth";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      caption: "",
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
      caption: this.state.caption,
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
            value={this.state.caption}
            name="caption"
          />
          <label>Add a Picture to your post </label>
          <input
            onChange={this.handleChange}
            value={this.state.image}
            placeholder=" Image URL"
            name="image"
          />
          <br />
          <button className="buttonsu-home">Post Your Memory</button>
        </form>
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
)(Add);
