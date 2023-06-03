const { equal } = require('joi');
const Video = require('../models/Video');

exports.uploadVideo = (req, res) => {
    // console.log(req, 'res')
    const video = new Video({
        name: req.file.originalname,
        heading: req.body.heading,
        para: req.body.para,
        url: req.file.location
    });

    video.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to save video in database');
        } else {
            res.status(200).json('Video uploaded and saved in database');
        }
    });
};

exports.getvideo = async (req, res) => {
    try {
        const data = await Video.find().sort({_id:-1})
        if (!data) {
            res.status(400).json({
                message: "unable to fetch data"
            })
        }
        res.status(200).json({
            count: data.count,
            message: "blogs video found",
            data: data
        })
    } catch (Err) {
        console.log(Err)
        res.status(500).json({
            message: "something went wrong"
        })
    }
}
