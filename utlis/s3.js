const AWS = require('aws-sdk');
const config = require('../config/config');

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    // region: 'YOUR_AWS_REGION',
    apiVersion: '2006-03-01' // Add this line
});

const s3 = new AWS.S3();

module.exports = s3;
