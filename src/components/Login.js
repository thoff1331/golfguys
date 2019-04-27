import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
  return (
    <div>
      <form className="formli">
        <label>UserName</label>
        <input />
        <label>PassWord</label>
        <input />
        <br />
        <button className="buttonsu">Login</button>
        <Link to="/signup">
          <p className="nav"> New Here? Click here to Sign Up</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
