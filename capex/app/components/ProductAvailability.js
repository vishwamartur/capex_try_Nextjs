"use client";
// Import React and other dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useClient } from "next/client"; // Import the useClient hook for client-side rendering

// Import the styles for the product availability component
import styles from "../styles/modules/ProductAvailability.module.css";

// Define the product availability component
const ProductAvailability = () => {
  // Use state variables to store the item data and the error message
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  // Use the useClient hook to mark the component as a client component
  const client = useClient();

  // Define a function to fetch the item data from the backend
  const fetchItems = async () => {
    try {
      // Send a GET request to the /items route and get the response
      const response = await axios.get("/items");
      // Set the item data to the state variable
      setItems(response.data);
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
    // Check if the component is being rendered on the client side
    if (client) {
      fetchItems();
    }
  }, [client]); // Ensure useEffect runs only on client-side rendering

  // Return the JSX code for rendering the product availability component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Availability</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.name} className={styles.image} />
            <div className={styles.content}>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.description}>{item.description}</p>
              <p className={styles.status}>
                {item.available ? "Available" : "Reserved"}
              </p>
              <Link href={`/${item.id}`}>
                <a className={styles.button}>Reserve Now</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the product availability component
export default ProductAvailability;
