import React, { Component } from "react";

class CycleDeVie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log("Composant monté");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log("Compteur mis à jour");
    }
  }

  componentWillUnmount() {
    console.log("Composant démonté");
  }

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <div>
        <p>Compteur: {this.state.count}</p>
        <button onClick={this.incrementCount}>Incrémenter</button>
      </div>
    );
  }
}

export default CycleDeVie;
