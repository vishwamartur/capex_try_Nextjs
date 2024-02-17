"use client";
// Import React and other dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// Import the styles for the client panel component
import styles from "../styles/modules/ClientPanel.module.css";

// Define the client panel component
const ClientPanel = () => {
  // Use state variables to store the reservation data and the error message
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  // Use the useRouter hook to access the router object
  const router = useRouter();

  // Define a function to fetch the reservation data from the backend
  const fetchReservations = async () => {
    try {
      // Send a GET request to the /reservations route and get the response
      const response = await axios.get("/reservations");
      // Set the reservation data to the state variable
      setReservations(response.data);
      // Clear the error message
      setError("");
    } catch (err) {
      // Handle any errors
      console.error(err);
      // Set the error message to the state variable
      setError("Failed to fetch reservation data");
    }
  };

  // Use the useEffect hook to fetch the reservation data when the component mounts
  useEffect(() => {
    fetchReservations();
  }, []);

  // Define a function to cancel a reservation from the database
  const cancelReservation = async (id) => {
    try {
      // Send a DELETE request to the /reservations/:id route and get the response
      const response = await axios.delete(`/reservations/${id}`);
      // Display a success message
      alert(response.data);
      // Fetch the updated reservation data
      fetchReservations();
    } catch (err) {
      // Handle any errors
      console.error(err);
      // Display an error message
      alert("Failed to cancel reservation");
    }
  };

  // Define a function to edit a reservation's date and time
  const editReservation = (id) => {
    // Redirect to the edit reservation page with the reservation id as a query parameter
    router.push(`/edit-reservation?id=${id}`);
  };

  // Return the JSX code for rendering the client panel component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Client Panel</h1>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.item}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => editReservation(reservation.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => cancelReservation(reservation.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the client panel component
export default ClientPanel;
