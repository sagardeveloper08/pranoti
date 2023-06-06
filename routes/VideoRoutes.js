const express = require('express');
const router = express.Router();
const blogController = require('../controller/videoController');

// Define routes for the blog
router.post('/upload', blogController.uploadVideo);

router.get('/videos',blogController.getAllVideos)

router.get('/videos/social/:contentType',blogController.getContent)

router.delete('/delete/videos/:id',blogController.deleteVideo)

module.exports = router;
