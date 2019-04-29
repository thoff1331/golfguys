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
  return (
    <div>
      <h1>Welcome, {props.auth.username}</h1>
    </div>
  );
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Profile);
