// Importing the express module
const express = require('express');

// Creating a router instance from the express module
const router = express.Router();

// Importing functions from the Youtube controller
const { YoutubeIDExcrator, createYoutubeVideo, GetVideoData, updateYoutubeVideo, deleteYoutubeVideo } = require('../Controllers/Youtube');

// Defining routes for YouTube-related operations
router.post('/GetVideoID', YoutubeIDExcrator);
router.post('/createvideo', createYoutubeVideo);
router.post('/updatevideo', updateYoutubeVideo);
router.post('/deletevideo', deleteYoutubeVideo);
router.get('/getvideodata/:query', GetVideoData);

// Exporting the router for use in other modules
module.exports = router;
