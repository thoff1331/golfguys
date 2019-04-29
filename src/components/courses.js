import React, { Component } from "react";
import axios from "axios";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: []
    };
  }
  componentDidMount() {
    axios.get("https://rickandmortyapi.com/api/character").then(response => {
      this.setState({ character: response.data.results });
    });
  }

  render() {
    let map = this.state.character.map(character => {
      return (
        <div className="fun">
          <div>
            <h1 className="app">{character.name}</h1>
            <img src={character.image} alt="" />
          </div>
        </div>
      );
    });
    return <div className="one">{map}</div>;
  }
}
export default Courses;
