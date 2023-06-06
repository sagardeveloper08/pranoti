const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('../config/config');

const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  // region: 'YOUR_AWS_REGION'
  apiVersion: '2006-03-01' // Add this line
});

// Configure Multer middleware
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'thepetwhisperervideos',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // Use a unique key for each file
    }
  })
});

const Video = require('../models/Video');

exports.uploadVideo = (req, res) => {
  upload.single('video')(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to upload video');
    }

    const video = new Video({
      name: req.file.originalname,
      heading: req.body.heading,
      para: req.body.para,
      url: req.file.location,
      contentType: req.body.contentType
    });

    video.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to save video in database');
      } else {
        res.status(200).json('Video uploaded and saved in database');
      }
    });
  });
};

exports.getAllVideos = (req, res) => {
  Video.find({}, (err, videos) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to retrieve videos');
    } else {
      res.status(200).json(videos);
    }
  });
};

exports.getContent = (req, res) => {
  const { contentType } = req.params;

  Video.find({ contentType }, (err, videos) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to retrieve videos');
    } else {
      res.status(200).json({ data: videos });
    }
  });
};


exports.deleteVideo = (req, res) => {
  const videoId = req.params.id;

  Video.findByIdAndRemove(videoId, (err, deletedVideo) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to delete video');
    } else {
      if (deletedVideo) {
        // Delete the corresponding file from S3
        const key = deletedVideo.url.split('/').pop();
        const params = {
          Bucket: 'thepetwhisperervideos',
          Key: key
        };
        s3.deleteObject(params, (err, data) => {
          if (err) {
            console.error(err);
          }
        });

        res.status(200).json('Video deleted successfully');
      } else {
        res.status(404).send('Video not found');
      }
    }
  });
};
