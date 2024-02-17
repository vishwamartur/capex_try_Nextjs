// Import React and other dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";

// Import the styles for the home page
import styles from "../styles/modules/Home.module.css";

// Define the home page component
const Home = () => {
  // Use state variables to store the item data and the error message
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

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
    fetchItems();
  }, []);

  // Return the JSX code for rendering the home page component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Capex Item Reservation</h1>
      <p className={styles.subtitle}>Find and reserve items with locations</p>
      <SearchBar />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.grid}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Export the home page component
export default Home;
