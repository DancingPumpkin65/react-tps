import React from "react";

function UserProfile({ user }) {
  return <h1>Bonjour, {user.firstName} {user.lastName} {user.age}!</h1>;
}

export default UserProfile;
