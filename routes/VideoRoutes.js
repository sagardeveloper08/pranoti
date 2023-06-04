const videos = require('../controller/videoController')
const {isAuthenticated} = require('../middleware/Auth')
const { authorizeRoles } = require('../middleware/Auth')
const express = require('express')
const router = express.Router()

router.get('/videos/all',videos.getvideo)

module.exports = router