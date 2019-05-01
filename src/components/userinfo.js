import React, { Component } from "react";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="users">
        <h4>Home Course:</h4>
        <h4> Handicap: </h4>
        <h4> Rounds Per Year</h4>
        <h4>Career Hole in One: 4</h4>
      </div>
    );
  }
}

export default UserInfo;
