import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./courses.scss";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      // userAddress: "",
      lat: "",
      long: "",
      search: ""
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {}
  getData() {
    // axios.get("/api/getGoogle").then(response => {
    //   this.setState({ data: response.data.results });
    //   console.log(response);
    // });
  }
  getLocation = () => {
    console.log("hitt");
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          this.state.userAddress
        }&key=AIzaSyAYc5zf8Pk1IyMfT0CLUHWWHtflYwm79qc`
      )
      .then(res => {
        this.setState(
          {
            lat: res.data.results,
            long: res.data.results
          },
          () => {
            let location = { lat: this.state.lat, long: this.state.long };
            axios.post("/auth/location", location).then(response => {
              this.setState({
                data: response.data
              });
            });
          }
        );
      });
  };

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
          <div className="search-feature">
            <input
              onChange={e => {
                this.setState({ userAddress: e.target.value });
              }}
              name="search"
              className="search-input"
              placeholder="Search address, Course or by your zip code"
            />
            <button className="button-search" onClick={this.getLocation}>
              Search for Courses near you!
            </button>
          </div>
          <div className="search-results" />
        </div>
      );
    }
  }
}

export default Courses;
