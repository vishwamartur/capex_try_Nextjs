// Import the pg module to interact with PostgreSQL
const { Pool } = require("pg");

// Create a pool of connections to the database
const pool = new Pool({
  host: "localhost", // The host name of the database server
  port: 5432, // The port number of the database server
  user: "postgres", // The user name to connect to the database
  password: "root@123", // The password to connect to the database
  database: "product", // The name of the database
});

// Export the pool object so that other modules can use it
module.exports = pool;
