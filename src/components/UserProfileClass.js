import React, { Component } from "react";

class UserProfileClass extends React.Component {
  render() {
    const { user } = this.props;
    return <h1>Bonjour, {user.firstName} {user.lastName}!</h1>;
  }
}

export default UserProfileClass;
