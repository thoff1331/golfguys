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
  componentDidMount() {
    this.getData();
  }
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
        <button onClick={this.getData}>Get Data</button>
        {map}
      </div>
    );
  }
}

export default Courses;
