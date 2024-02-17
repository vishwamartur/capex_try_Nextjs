// Import React and other dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/router";

// Import the styles for the item page
import styles from "../styles/modules/Item.module.css";

// Define the item page component
const Item = ({ item }) => {
  // Return the JSX code for rendering the item page component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{item.name}</h1>
      <img src={item.image} alt={item.name} className={styles.image} />
      <p className={styles.description}>{item.description}</p>
      <p className={styles.price}>Price: ${item.price}</p>
      <p className={styles.location}>Location: {item.location}</p>
      <Link href={`/reserve/${item.id}`}>
        <a className={styles.button}>Reserve Now</a>
      </Link>
    </div>
  );
};

// Define a function to get the static paths for the item page
export const getStaticPaths = async () => {
  // Get the item ids from the backend
  const response = await axios.get("/items");
  const items = response.data;

  // Map the item ids to the paths
  const paths = items.map((item) => ({
    params: { id: item.id.toString() },
  }));

  // Return the paths and the fallback option
  return {
    paths,
    fallback: false,
  };
};

// Define a function to get the static props for the item page
export const getStaticProps = async (context) => {
  // Get the item id from the context
  const id = context.params.id;

  // Get the item data from the backend
  const response = await axios.get(`/items/${id}`);
  const item = response.data;

  // Return the item data as props
  return {
    props: {
      item,
    },
  };
};

// Export the item page component
export default Item;
