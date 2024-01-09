// Importing required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importing route modules
const YoutubeRoutes = require('./routes/Youtube');
const ContactRoutes = require('./routes/Contact');
const GallertyRoutes = require('./routes/Gallery');

// Creating an express application
const app = express();
const PORT = process.env.PORT || 7878;

// Setting up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGOURI);

// Event handlers for database connection
mongoose.connection.once("open", () => {
  console.log("Database connected successfully");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server Running Successfully on Port: 7878' });
});

// Initializing routes
app.use('/api/youtube', YoutubeRoutes);
app.use('/api/contact', ContactRoutes);
app.use('/api/gallery', GallertyRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
