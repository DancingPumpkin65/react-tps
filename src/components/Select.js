import React, { Component } from "react";

class Select extends Component {
  handleChange = (e) => {
    console.log("Sélectionné:", e.target.value);
  };

  render() {
    return (
      <select onChange={this.handleChange}>
        {this.props.options.map((option, index) => (
          <option key={index} value={index + 1}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}

export default Select;
