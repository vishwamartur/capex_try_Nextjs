"use client";
// Import React and other dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// Import the styles for the admin panel component
import styles from "../styles/modules/AdminPanel.module.css";

// Define the admin panel component
const AdminPanel = () => {
  // Use state variables to store the user data and the error message
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Use the useRouter hook to access the router object
  const router = useRouter();

  // Define a function to fetch the user data from the backend
  const fetchUsers = async () => {
    try {
      // Send a GET request to the /users route and get the response
      const response = await axios.get("/users");
      // Set the user data to the state variable
      setUsers(response.data);
      // Clear the error message
      setError("");
    } catch (err) {
      // Handle any errors
      console.error(err);
      // Set the error message to the state variable
      setError("Failed to fetch user data");
    }
  };

  // Use the useEffect hook to fetch the user data when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Define a function to delete a user from the database
  const deleteUser = async (id) => {
    try {
      // Send a DELETE request to the /users/:id route and get the response
      const response = await axios.delete(`/users/${id}`);
      // Display a success message
      alert(response.data);
      // Fetch the updated user data
      fetchUsers();
    } catch (err) {
      // Handle any errors
      console.error(err);
      // Display an error message
      alert("Failed to delete user");
    }
  };

  // Define a function to edit a user's profile
  const editUser = (id) => {
    // Redirect to the edit user page with the user id as a query parameter
    router.push(`/edit-user?id=${id}`);
  };

  // Return the JSX code for rendering the admin panel component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => editUser(user.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the admin panel component
export default AdminPanel;
