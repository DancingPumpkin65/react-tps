import React, { Component } from "react";

class LumosCheckboxClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
    };
    this.spells = ["Accio", "Expelliarmus", "Expecto Patronum"];
  }

  handleChange = (e) => {
    const { value, checked } = e.target;

    this.setState((prevState) => {
      if (checked) {
        return { selectedOptions: [...prevState.selectedOptions, value] };
      } else {
        return {
          selectedOptions: prevState.selectedOptions.filter(
            (option) => option !== value
          ),
        };
      }
    });
  };

  render() {
    const { selectedOptions } = this.state;

    return (
      <div>
        <h1>Spells class</h1>
        {this.spells.map((spell, index) => (
          <label key={index}>
            <input type="checkbox" name="spells" value={spell} checked={selectedOptions.includes(spell)} onChange={this.handleChange} />
            {spell}
          </label>
        ))}
        <p>Spells chosen: {selectedOptions.join(", ") || "no spell"}</p>
      </div>
    );
  }
}

export default LumosCheckboxClass;
