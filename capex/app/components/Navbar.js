// Import React and other dependencies
import React from "react";
import Link from "next/link";

// Import the styles for the navbar component
import styles from "../styles/modules/Navbar.module.css";

// Define the navbar component
const Navbar = () => {
  // Return the JSX code for rendering the navbar component
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="Capex Item Reservation" />
          </a>
        </Link>
      </div>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/admin-panel">
            <a>Admin Panel</a>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/client-panel">
            <a>Client Panel</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Export the navbar component
export default Navbar;
