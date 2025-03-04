import React, { Component } from "react";

class ItemListClass extends Component {
  render() {
    const { items } = this.props;
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}

export default ItemListClass;
