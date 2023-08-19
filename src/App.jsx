import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = { advice: "", loading: false };

  componentDidMount() {
    this.fetchAdvice();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.advice === this.state.advice && !this.state.loading) {
      this.fetchAdvice();
    }
  }

  fetchAdvice = () => {
    this.setState({ loading: true });

    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice, loading: false });
      })
      .catch((error) => {
        console.log("Error fetching advice:", error);
        this.setState({ loading: false });
      });
  };

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.fetchAdvice();
    }
  };

  render() {
    const { advice, loading } = this.state;
    return (
      <div className="App">
        <h1 className="content">{advice}</h1>
        <button
          className="button-to-fetch"
          onClick={this.handleButtonClick}
          disabled={loading}
        >
          {loading ? "Advices are on the way..." : "Give me a new advice!"}
        </button>
      </div>
    );
  }
}

export default App;
