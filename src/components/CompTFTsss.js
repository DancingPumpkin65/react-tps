import React, { useState, useEffect } from "react";
import data from "../data.json";

const CompTFTsss = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data);
  }, []);

  return (
    <div>
      <h1>sers fetch local src</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
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

export default CompTFTsss;