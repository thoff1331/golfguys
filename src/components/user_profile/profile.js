import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserInfo from "../profile_pages/userinfo";
import axios from "axios";
import { getSession } from "../../ducks/auth";
import "./profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false,
      profile: [],
      course: "",
      handicap: "",
      rounds: "",
      career: "",
      showInput: false,
      profileValues: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(id) {
    this.props.getSession();
    axios.get("/auth/profile/:id").then(res => {
      this.setState({
        profile: res.data
      });
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit() {
    console.log("hittem");
    axios
      .put("/auth/profileSetup", {
        course: this.state.course,
        handicap: this.state.handicap,
        rounds: this.state.rounds,
        career: this.state.career
      })
      .then(res => {
        console.log(res);
        this.setState(
          {
            profile: res.data,
            showInput: false
          },
          () => console.log(this.state.profile)
        );
      });
  }

  render() {
    console.log(this.state.course);
    console.log(this.state.showInput);

    if (!this.props.auth.username) {
      return (
        <h1 className="protected-profile">
          <Link className="protected-pp" to="/login">
            Please Login{" "}
          </Link>
        </h1>
      );
    }

    let mappedProfile = this.state.profile.map((val, index) => {
      return (
        <div className="profile-default">
          <div className="dereks-here">
            <h1>Home Course: {val.course}</h1>
            <h1>Handicap: {val.handicap}</h1>
            <h1> Rounds Per Year: {val.rounds}</h1>
            <h1> Career Hole in One: {val.career}</h1>
            <button
              className="edit-button"
              onClick={() => this.setState({ showInput: true })}
            >
              Edit
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="profile-background">
        <div className="derek2">
          <h1 className="bump">
            {" "}
            Welcome to {this.props.auth.username}'s' page{" "}
            <img className="pp" src={this.props.auth.pp} />
          </h1>
          <div className="profile-pp" />
        </div>
        <div className="users">
          <div className="derek">
            <div className="profile-intro">
              <h3 className="welcome-prof">
                Welcome to {this.props.auth.username}'s Profile{" "}
              </h3>
            </div>
          </div>
          <div className="mapped-profile">
            {mappedProfile}

            {this.state.showInput ? (
              <form
                onSubmit={this.handlesubmit}
                autoComplete="off"
                className="profile-form"
              >
                <label>Home Course</label>
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
                  placeholder="Handicap"
                />
                <label>Rounds Per Year</label>
                <input
                  value={this.state.rounds}
                  onChange={this.handleChange}
                  name="rounds"
                  type="number"
                  autoComplete="off"
                  placeholder="Rounds Per Year"
                />
                <label>Career Hole in One</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.career}
                  name="career"
                  type="number"
                  autoComplete="off"
                  placeholder="Career Hole in one"
                />
                <button
                  onClick={this.handleSubmit}
                  className="submit-button-edit"
                >
                  submit
                </button>
              </form>
            ) : null}
          </div>
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;
export default connect(
  mapStateToProps,
  { getSession }
)(Profile);
