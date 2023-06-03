const express = require('express');
const blogController = require('../controller/blogController');
const multer = require('multer');
const router = express.Router();
const upload = multer(); // Create multer instance


router.post('/upload/blogs', upload.single('video'),blogController.uploadBlog);

router.get('/blogs', blogController.getAllBlogs);


module.exports = router;
