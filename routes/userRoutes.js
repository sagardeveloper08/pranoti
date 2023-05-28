const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')


// route to register the user
router.post('/register/user', userController.registeruser)



module.exports = router