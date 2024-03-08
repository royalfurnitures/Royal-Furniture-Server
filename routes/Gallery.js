// Importing the express module
const express = require('express');

// Creating a router instance from the express module
const router = express.Router();

// Importing the multer middleware for handling file uploads
const multer = require('multer');

// Importing the imageController from the Gallery controller
const imageController = require('../Controllers/Gallery');

// Configuring multer to use in-memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Defining routes for image-related operations
router.post('/upload', upload.array('files', 20), imageController.uploadImage);
router.post('/create-post', imageController.CreatePost);
router.get('/get-all-post/:query', imageController.GetAllPhotos);
router.post('/delete-photo', imageController.DeletePhoto);
router.post('/update-post', imageController.UpdatePost);
router.post('/delete-post', imageController.DeletePost);

// Exporting the router for use in other modules
module.exports = router;
