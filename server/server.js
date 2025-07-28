const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dynamicRoutes = require('./routes/dynamicRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load dynamic routes
app.use('/api', dynamicRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});