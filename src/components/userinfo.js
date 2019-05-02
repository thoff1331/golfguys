import React, { Component } from "react";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="users">
        <h4>Home Course: Carnoustie</h4>
        <h4> Handicap: 7 </h4>
        <h4> Rounds Per Year: 52</h4>
        <h4>Career Hole in One: 4</h4>
      </div>
    );
  }
}

export default UserInfo;
