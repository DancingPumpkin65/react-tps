import React, { useState, useEffect } from "react";
import axios from "axios";

const CompTFT = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        setUsers(res.data);
      });
  }, []);

  return (
    <div>
      <h1>users axios</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>user</th>
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

export default CompTFT;