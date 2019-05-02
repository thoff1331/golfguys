import React, { Component } from "react";
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {}
  getData() {
    axios.get("/api/getGoogle").then(response => {
      this.setState({ data: response.data.results });
      console.log(response);
    });
  }
  render() {
    let map = this.state.data.map(val => {
      return (
        <div className="bump">
          <h1>{val.name}</h1>
        </div>
      );
    });

    return (
      <div>
        <div className="search-feature">
          <input
            className="search-input"
            placeholder="Search address, Course or by your zip code"
          />
          <button className="button-search" onClick={this.getData}>
            Search for Courses near you!
          </button>
        </div>
        <div className="search-results">{map}</div>
      </div>
    );
  }
}

export default Courses;
