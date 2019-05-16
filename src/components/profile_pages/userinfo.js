import React, { Component } from "react";
import { ALPN_ENABLED } from "constants";
import axios from "axios";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      course: "",
      handicap: "",
      rounds: "",
      career: "",
      showInput: false,
      profileValues: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // }
    // // componentDidMount() {
    // //   axios;
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/auth/profileSetup/${user_id}", {
        course: this.state.course,
        handicap: this.state.handicap,
        rounds: this.state.rounds,
        career: this.state.career
      })
      .then(res => {
        this.setState({
          profileValues: res.data
        });
      });
  }
  render() {
    let mappedProfile = this.state.profileValues.map((val, index) => {
      return (
        <div>
          <h1>Home Course: {val.course}</h1>
          <h1>Handicap: {val.handicap}</h1>
          <h1> Rounds Per Year: {val.rounds}</h1>
          <h1> Career Hole in One: {val.career}</h1>
        </div>
      );
    });
    return (
      <div className="users">
        {mappedProfile}
        <button onClick={() => this.setState({ showInput: true })}>Edit</button>
        {/* <h4>Home Course:</h4> */}
        {this.state.showInput ? (
          <form
            onSubmit={this.handlesubmit}
            autoComplete="off"
            className="profile-form"
          >
            <label>HomeCourse</label>
            <input
              onChange={this.handleChange}
              placeholder="course"
              name="course"
              value={this.state.course}
              autoComplete="off"
            />
            <label> Handicap</label>
            <input
              onChange={this.handleChange}
              name="handicap"
              value={this.state.handicap}
              type="number"
              autoComplete="off"
            />
            <label>Rounds Per Year</label>
            <input
              value={this.state.rounds}
              onChange={this.handleChange}
              name="rounds"
              type="number"
              autoComplete="off"
            />
            <label>Career Hole in One</label>
            <input
              onChange={this.handleChange}
              value={this.state.career}
              name="career"
              type="number"
              autoComplete="off"
            />
            <button onClick={this.handleSubmit}>submit</button>
          </form>
        ) : null}
        {this.state.showInput ? (
          <button
            className="profile-change-button"
            onClick={() => this.setState({ showInput: false })}
          >
            Submit
          </button>
        ) : null}

        {/* <h4> Rounds Per Year: 52</h4>
        <h4>Career Hole in One: 4</h4> */}
      </div>
    );
  }
}

export default UserInfo;
