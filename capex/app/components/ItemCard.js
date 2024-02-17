// Import React and other dependencies
import React from "react";
import Link from "next/link";

// Import the styles for the item card component
import styles from "../styles/modules/ItemCard.module.css";

// Define the item card component
const ItemCard = ({ item }) => {
  // Return the JSX code for rendering the item card component
  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        <Link href={`/${item.id}`}>
          <a className={styles.button}>View Details</a>
        </Link>
      </div>
    </div>
  );
};

// Export the item card component
export default ItemCard;
