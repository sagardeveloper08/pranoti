const dotenv = require("dotenv")
const path = require("path")

process.env.NODE_ENV = "test"

dotenv.config({ path: path.join(__dirname, `../environment/.${process.env.NODE_ENV}.env`) })

module.exports = {
    port: process.env.port,
    mongodburl: process.env.mongodburl,
    version: process.env.version,
    JWT: process.env.JWt,
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    twilloNumber:process.env.twilloNumber,
    twilloAuthToken:process.env.twilloAuthToken,
    twilioSid:process.env.twilioSid,
    number:process.env.number
}