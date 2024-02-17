// Import Express.js and other dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

// Import the pool object from db.js
const pool = require("./db");

// Create an Express app
const app = express();

// Define the port number for the server
const port = 5000;

// Use middleware to parse the request body, enable CORS, and manage sessions
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Use passport to initialize and configure authentication strategies
app.use(passport.initialize());
app.use(passport.session());

// Define a route to test the database connection
app.get("/test", async (req, res) => {
  try {
    // Query the database and get the results
    const results = await pool.query("SELECT * FROM items");
    // Send the results as a JSON response
    res.json(results.rows);
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Define other routes to handle user registration, login, logout, item reservation, etc.
// You can use passport.authenticate() to protect the routes that require authentication
// You can also use pool.query() to perform CRUD operations on the database
// For example, you can write something like this:

// Register a new user
app.post("/register", async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, password, email } = req.body;
    // Check if the username or email already exists in the database
    const user = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (user.rowCount > 0) {
      // Send an error message if the user already exists
      return res.status(400).send("User already exists");
    }
    // Hash the password using bcrypt or any other encryption library
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the user data into the database
    await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
      [username, hashedPassword, email]
    );
    // Send a success message
    res.send("User registered successfully");
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login an existing user
app.post("/login", passport.authenticate("local"), (req, res) => {
  // Send the user data as a JSON response
  res.json(req.user);
});

// Logout the current user
app.get("/logout", (req, res) => {
  // Terminate the session
  req.logout();
  // Send a success message
  res.send("User logged out successfully");
});

// Reserve an item
app.post("/reserve", passport.authenticate("local"), async (req, res) => {
  try {
    // Get the item id, date, and time from the request body
    const { item_id, date, time } = req.body;
    // Get the user id from the session
    const user_id = req.user.id;
    // Check if the item is available for the given date and time
    const availability = await pool.query(
      "SELECT * FROM reservations WHERE item_id = $1 AND date = $2 AND time = $3",
      [item_id, date, time]
    );
    if (availability.rowCount > 0) {
      // Send an error message if the item is already reserved
      return res.status(400).send("Item is already reserved");
    }
    // Insert the reservation data into the database
    await pool.query(
      "INSERT INTO reservations (item_id, user_id, date, time) VALUES ($1, $2, $3, $4)",
      [item_id, user_id, date, time]
    );
    // Send a success message
    res.send("Item reserved successfully");
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
