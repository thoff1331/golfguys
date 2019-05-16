import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./courses.scss";
import courseList from "./courselist";

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
      // let map = this.state.data.map(val => {
      //   return (
      //     <div className="bump">
      //       <h1>{val.name}</h1>
      //     </div>
      //   );
      // });

      return (
        <div className="course-page">
          <h1 className="course-banner"> Courses In Dallas,Texas</h1>
        </div>
      );
    }
  }
}

export default Courses;
