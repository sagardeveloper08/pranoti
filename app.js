// intialzing the dependinces
const express = require('express');
const cors = require('cors');
const config = require('./config/config')
const helmet = require('helmet');
// importing logger.js in app.js
const logger = require('./utlis/logger')

// database connection
require('./database/db')

// requiring routes dependencies
const userRoutes = require('./routes/userRoutes')

// defining the port on which application should run
port = config.port || 5000

//usng dependencies
const app = express()
// parses incoming requests with JSON payloads
app.use(express.json())

// using cors to solve cross-origin error
app.use(cors())
// defing logs // Middleware to log requests

app.use((err,req, res, next) => {

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
app.use('/api/v1', userRoutes)

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

app.listen(port, () => {
    console.table([
        {
            port: `${port}`
        }
    ])
})