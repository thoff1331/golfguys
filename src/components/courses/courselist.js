import React, { Component } from "react";
import "./courses.scss";

class courseList extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
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
    );
  }
}

export default courseList;
