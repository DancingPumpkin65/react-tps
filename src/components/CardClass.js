import React, { Component } from "react";

class CardClass extends Component {
    render() {
        return (
            <div style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }}>
                {this.props.children}
            </div>
        );
    }
}

export default CardClass;
