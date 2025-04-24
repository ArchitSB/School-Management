// config/db.js
const mysql = require('mysql2/promise'); // Using promise-based version
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Wait if all connections are busy
  connectionLimit: 10,      // Max number of connections in pool
  queueLimit: 0             // No limit on queued connection requests
});

// Optional: Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.message);
    // Exit the process if the initial DB connection fails
    process.exit(1);
  });

module.exports = pool; // Export the pool for use in other modules