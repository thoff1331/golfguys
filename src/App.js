import React, { Component } from "react";

import "./App.scss";
import { HashRouter, Link } from "react-router-dom";
import routes from "./components/routes";
import ball from "./pics/ball.png";
import tee from "./pics/tee.png";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuStatus: ""
    };
  }
  handleClick = () => {
    if (this.state.menuStatus === "open") {
      this.setState({
        menuStatus: "closed"
      });
    } else {
      this.setState({
        menuStatus: "open"
      });
    }
  };
  render() {
    return (
      <HashRouter>
        <nav>
          <div className="mainheader">
            <header>Golf Guys!</header>

            <img className="ballpic" src={ball} alt="ball" />
          </div>
          <div className="links">
            <div className="navbarTop">
              <Link className="nav" to="/">
                Home
              </Link>
              <Link className="nav" to="/profile">
                Profile
              </Link>
              <Link className="nav" to="/upgrade">
                Upgrade
              </Link>
              <Link className="nav" to="/courses">
                {" "}
                Go Play!
              </Link>

              <Link className="nav" to="/signup">
                Sign Up!
              </Link>
              <Link className="nav" to="/login">
                Log In!
              </Link>
            </div>
          </div>
          <img
            onClick={this.handleClick}
            className="tee-menu"
            src={tee}
            alt="name"
          />
        </nav>
        <div className={"top-menu-" + this.state.menuStatus}>
          <div className="top-menu-list">
            <Link to="/" className="six">
              <h6>Home</h6>
            </Link>{" "}
            <Link to="/profile" className="six">
              <h6>Profile</h6>
            </Link>
            <Link to="/courses" className="six">
              <h6>Go Play!</h6>
            </Link>{" "}
            <Link to="/signup" className="six">
              <h6>Signup</h6>
            </Link>
            <Link to="/login" className="six">
              {" "}
              <h6>Login</h6>
            </Link>
          </div>
        </div>
        <div>{routes}</div>
        <div className="footer">
          <h1 />
        </div>
      </HashRouter>
    );
  }
}

export default App;
