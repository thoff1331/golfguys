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
      console.log(response);
    });
  }
  render() {
    console.log(this.state.data);
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
        <div>
          <div className="course-page">
            <h1 className="course-banner"> Courses In Dallas,Texas</h1>
            <div className="course-list">
              <h1>1.Stevens Park Golf Course</h1>
              <h3>Address: 1005 N Montclair Ave, Dallas, TX 75208 </h3>
              <h1>2.Cedar Crest Golf Course </h1>
              <h3> Address: 1800 Southerland Ave, Dallas, TX 75203 </h3>
              <h1>3.Tenision Park Golf Course</h1>
              <h3> Address: 3501 Samuell Blvd, Dallas, TX 75223 </h3>
              <h1>4.Grover C. Keeton Golf Course </h1>
              <h3>Address: 2323 N Jim Miller Rd, Dallas, TX 75227 </h3>
              <h1> 5.Brook Hollow Golf Club </h1>
              <h3> Address: 8301 Harry Hines Blvd, Dallas, TX 75235 </h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Courses;
