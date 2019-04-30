import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function Profile(props) {
  if (!props.auth.username) {
    return (
      <h1>
        <Link to="/login">Please Login </Link>
      </h1>
    );
  }
  console.log(props.auth);
  return (
    <div className="lineups">
      <h1 className="bump">Welcome, {props.auth.username}</h1>
      <img src={props.auth.pp} className="pp" />
      <button className="buttonsu">Change Profile Pic</button>
    </div>
  );
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Profile);
