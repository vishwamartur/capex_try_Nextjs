"use client";
// Import React and other dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import the styles for the product reservation component
import styles from "../styles/modules/ProductReservation.module.css";

// Define the product reservation component
const ProductReservation = () => {
  // Use state variables to store the item data, the reservation data, and the error message
  const [item, setItem] = useState(null);
  const [reservation, setReservation] = useState({
    date: new Date(),
    time: "09:00",
  });
  const [error, setError] = useState("");

  // Use the useRouter hook to access the router object
  const router = useRouter();

  // Get the item id from the query parameter
  const { id } = router.query;

  // Define a function to fetch the item data from the backend
  const fetchItem = async () => {
    try {
      // Send a GET request to the /items/:id route and get the response
      const response = await axios.get(`/items/${id}`);
      // Set the item data to the state variable
      setItem(response.data);
      // Clear the error message
      setError("");
    } catch (err) {
      // Handle any errors
      console.error(err);
      // Set the error message to the state variable
      setError("Failed to fetch item data");
    }
  };

  // Use the useEffect hook to fetch the item data when the component mounts
  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  // Define a function to handle the change of the reservation date
  const handleDateChange = (date) => {
    // Update the reservation state variable with the new date
    setReservation((prev) => ({
      ...prev,
      date,
    }));
  };

  // Define a function to handle the change of the reservation time
  const handleTimeChange = (e) => {
    // Get the value from the event target
    const time = e.target.value;
    // Update the reservation state variable with the new time
    setReservation((prev) => ({
      ...prev,
      time,
    }));
  };

  // Define a function to submit the reservation data to the backend
  const handleSubmit = async (e) => {
    // Prevent the default browser behavior
    e.preventDefault();
    try {
      // Send a POST request to the /reserve route and get the response
      const response = await axios.post("/reserve", {
        item_id: id,
        date: reservation.date,
        time: reservation.time,
      });
      // Display a success message
      alert(response.data);
      // Redirect to the home page
      router.push("/");
    } catch (err) {
      // Handle any errors
      console.error(err);
      // Display an error message
      alert("Failed to reserve item");
    }
  };

  // Return the JSX code for rendering the product reservation component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Reservation</h1>
      {error && <p className={styles.error}>{error}</p>}
      {item && (
        <div className={styles.card}>
          <img src={item.image} alt={item.name} className={styles.image} />
          <div className={styles.content}>
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.description}>{item.description}</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="date">
                Date
              </label>
              <DatePicker
                id="date"
                className={styles.input}
                selected={reservation.date}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
              <label className={styles.label} htmlFor="time">
                Time
              </label>
              <select
                id="time"
                className={styles.input}
                value={reservation.time}
                onChange={handleTimeChange}
              >
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
              <button className={styles.button} type="submit">
                Reserve
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the product reservation component
export default ProductReservation;
