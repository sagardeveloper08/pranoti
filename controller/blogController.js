const Blog = require('../models/Blogs');
const multer = require('multer');
const s3 = require('../utlis/s3');
const upload = multer();

async function uploadBlog(req, res) {
  try {
    const { name, heading, paragraph, date } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Video file is missing' });
    }

    const videoFile = req.file;
    const videoKey = `videos/${Date.now()}_${videoFile.originalname}`;

    // Upload video to S3
    const videoUploadParams = {
      Bucket: 'thepetwhispererblogs',
      Key: videoKey,
      Body: videoFile.buffer,
    };
    const s3Response = await s3.upload(videoUploadParams).promise();

    // Generate S3 URL for the uploaded video
    const videoUrl = s3Response.Location;
    
    // Create new blog instance
    const newBlog = new Blog({
      name,
      heading,
      paragraph,
      date,
      url: videoUrl,
    });
    console.log(newBlog)
        // Save the blog instance to the database
    await newBlog.save();

    // Return the saved blog object as the API response
    res.status(200).json({
        message:"Blogs list",
        data:newBlog
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getAllBlogs(req, res) {
    try {
      const blogs = await Blog.find();
        console.log(blogs,'blogs')
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

module.exports = {
  uploadBlog,getAllBlogs
};
