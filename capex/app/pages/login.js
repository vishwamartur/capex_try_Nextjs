// Import React and other dependencies
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useFormik } from "formik";

// Import the styles for the login page
import styles from "../styles/modules/Login.module.css";

// Define the login page component
const Login = () => {
  // Use state variables to store the error message and the loading status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use the useRouter hook to access the router object
  const router = useRouter();

  // Define the validation schema for the login form
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
      return null;
    },
  };

  // Use the useFormik hook to create the formik object
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
        // Send a POST request to the /api/users/authenticate route and get the response
        const response = await axios.post("/api/users/authenticate", values);
        // Get the token from the response data
        const token = response.data.token;
        // Save the token to the local storage
        localStorage.setItem("token", token);
        // Redirect to the home page
        router.push("/");
      } catch (err) {
        // Handle any errors
        console.error(err);
        // Set the error message to the state variable
        setError("Invalid username or password");
      } finally {
        // Set the loading status to false
        setLoading(false);
      }
    },
  });

  // Return the JSX code for rendering the login page component
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
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
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

// Export the login page component
export default Login;
