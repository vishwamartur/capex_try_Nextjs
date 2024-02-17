"use client";
// Import React and other dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";

// Import the styles for the search bar component
import styles from "../styles/modules/SearchBar.module.css";

// Define the search bar component
const SearchBar = () => {
  // Use state variables to store the search query and the error message
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // Use the useRouter hook to access the router object
  const router = useRouter();

  // Define a function to handle the change of the search query
  const handleChange = (e) => {
    // Get the value from the event target
    const value = e.target.value;
    // Update the query state variable with the new value
    setQuery(value);
    // Clear the error message
    setError("");
  };

  // Define a function to handle the submission of the search query
  const handleSubmit = (e) => {
    // Prevent the default browser behavior
    e.preventDefault();
    // Validate the query input
    if (!query.trim()) {
      // Set the error message to the state variable
      setError("Please enter a valid query");
      return;
    }
    // Redirect to the search results page with the query as a query parameter
    router.push(`/search?query=${query}`);
  };

  // Return the JSX code for rendering the search bar component
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search for an item..."
          value={query}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

// Export the search bar component
export default SearchBar;
