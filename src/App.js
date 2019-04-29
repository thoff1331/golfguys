import React, { Component } from "react";

import "./App.scss";
import { HashRouter, Link } from "react-router-dom";
import routes from "./components/routes";
import ball from "./pics/ball.png";
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
            src="data:image/webp;base64,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"
            alt="name"
          />
        </nav>
        <div className={"top-menu-" + this.state.menuStatus}>
          <div className="top-menu-list">
            <Link to="/">
              <h6>Home</h6>
            </Link>{" "}
            <Link to="/profile">
              <h6>Profile</h6>
            </Link>
            <Link to="/courses">
              <h6>Go Play!</h6>
            </Link>{" "}
            <Link to="/signup">
              <h6>Signup</h6>
            </Link>
            <Link to="/login">
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
