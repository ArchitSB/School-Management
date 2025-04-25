const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Base route for health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'School Management API is running!' });
});

// Mount the school routes under the /api prefix
app.use('/api/schools', schoolRoutes); // All routes in schoolRoutes will be prefixed with /api/schools

// --- Error Handling Middleware ---
// Catch 404 Not Found errors for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found on this server.' });
});

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err); // Log the error stack for debugging
  res.status(err.status || 500).json({
      message: err.message || 'An unexpected internal server error occurred.',
  });
});


// --- Start the Server ---
const PORT = process.env.PORT // Use port from .env or default to 3000

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app; 