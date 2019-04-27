import React from "react";
import { Link } from "react-router-dom";

function Signup(props) {
  return (
    <div>
      <form className="formsu">
        <label>Email</label>
        <input />
        <label>UserName</label>
        <input />
        <label>PassWord</label>
        <input />
        <br />
        <button className="buttonsu">Join The Club</button>
        <Link to="/login">
          <p className="nav">Already Registered? Login here</p>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
