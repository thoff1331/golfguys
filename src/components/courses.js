import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    // if (!this.props.username) {
    //   return (
    //     <h1 className="protected-profile">
    //       <Link to="/login">Please Login </Link>
    //     </h1>
    //   );
    // } else {
    {
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
}

export default Courses;
