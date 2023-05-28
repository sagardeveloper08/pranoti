const express = require('express')
const router = express.Router()
const { validateUser } = require('../middleware/userValidations')
const userController = require('../controller/userController')
const { isAuthenticated } = require('../middleware/Auth')

// route to register the user
router.post('/register/user', validateUser, userController.registeruser)



module.exports = router