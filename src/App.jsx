import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = { advice: "" };

  componentDidMount() {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  render() {
    const { advice } = this.state;
    return <h1>{advice}</h1>;
  }
}

export default App;
