// Import React and other dependencies
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useFormik } from "formik";

// Import the styles for the register page
import styles from "../styles/modules/Register.module.css";

// Define the register page component
const Register = () => {
  // Use state variables to store the error message and the loading status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use the useRouter hook to access the router object
  const router = useRouter();

  // Define the validation schema for the register form
  const validationSchema = {
    username: (value) => {
      if (!value) {
        return "Username is required";
      }
      return null;
    },
    password: (value) => {
      if (!value) {
        return "Password is required";
      }
      if (value.length < 6) {
        return "Password must be at least 6 characters";
      }
      return null;
    },
    email: (value) => {
      if (!value) {
        return "Email is required";
      }
      // Use a simple regex to validate the email format
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        return "Email is invalid";
      }
      return null;
    },
  };

  // Use the useFormik hook to create the formik object
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validate: (values) => {
      // Validate the form values against the validation schema
      const errors = {};
      for (const key in values) {
        const error = validationSchemakey;
        if (error) {
          errors[key] = error;
        }
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        // Set the loading status to true
        setLoading(true);
        // Clear the error message
        setError("");
        // Send a POST request to the /api/users/register route and get the response
        const response = await axios.post("/api/users/register", values);
        // Display a success message
        alert(response.data);
        // Redirect to the login page
        router.push("/login");
      } catch (err) {
        // Handle any errors
        console.error(err);
        // Set the error message to the state variable
        setError("Failed to register user");
      } finally {
        // Set the loading status to false
        setLoading(false);
      }
    },
  });

  // Return the JSX code for rendering the register page component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className={styles.input}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && (
            <p className={styles.error}>{formik.errors.username}</p>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className={styles.error}>{formik.errors.password}</p>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className={styles.error}>{formik.errors.email}</p>
          )}
        </div>
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

// Export the register page component
export default Register;
