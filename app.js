// intialzing the dependinces
const express = require('express');
const cors = require('cors');
const config = require('./config/config')
const helmet = require('helmet');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const videoController = require('./controller/videoController');

// importing logger.js in app.js
const logger = require('./utlis/logger')


// database connection
require('./database/db')

// requiring routes dependencies
const userRoutes = require('./routes/userRoutes')
const videos = require('./routes/VideoRoutes')

// for google cloud
port = process.env.PORT || 5000

// defining the port on which application should run for local
// port = config.port || 5000

//usng dependencies
const app = express()
// parses incoming requests with JSON payloads
app.use(express.json())
app.use(cors())

// using cors to solve cross-origin error
// defing logs // Middleware to log requests

app.use((err, req, res, next) => {

    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
});

//using helmet to secure the routes and applications 
//  Open the Network tab by clicking on Inspect Element.
//  Click on localhost and you will notice an additional set of headers in response
app.use(helmet());
//  parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }))

// defining routes

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

// getting intilaze response from server
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "server responding "
    })
})
// 


// const s3 = new AWS.S3({
//     accessKeyId: config.accessKeyId,
//     secretAccessKey: config.secretAccessKey,
//     // region: 'YOUR_AWS_REGION'
//     apiVersion: '2006-03-01' // Add this line

// });

// // Configure Multer middleware
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'thepetwhisperervideos',
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString()); // Use a unique key for each file
//         }
//     })
// });
// console.log(upload,'upload')
const blogRoutes = require('./routes/VideoRoutes');
const details = require('./routes/detailsRoutes')
// app.use(apiProxy);
app.use('/api/v1', blogRoutes);
app.use('/api/v1', userRoutes)
app.use('/api/v1',videos)
app.use('/api/v1',details)

// app.post('/api/v1', upload.single('video'), videoController.uploadVideo);

// app.use(`/.netlify/functions/api`, userRoutes);

app.listen(port, () => {
    console.table([
        {
            port: `${port}`
        }
    ])
})

