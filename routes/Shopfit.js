// Importing the express module
const express = require('express');

// Creating a router instance from the express module
const router = express.Router();

// Importing the imageController from the Gallery controller
const { CreatePost ,GetAllPhotos , DeletePost , UpdatePost } = require('../Controllers/Shopfit');



// Defining routes for image-related operations
router.post('/create-post', CreatePost);
router.get('/get-all-post/:query', GetAllPhotos);
router.post('/update-post', UpdatePost);
router.post('/delete-post', DeletePost);

// Exporting the router for use in other modules
module.exports = router;
