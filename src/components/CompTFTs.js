import React, { useState, useEffect } from "react";

const CompTFTs = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <h1>users fetsh</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>username</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompTFTs;