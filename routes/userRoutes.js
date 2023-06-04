const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')


// route to register the user
router.post('/register/user', userController.registeruser)

router.post('/login',userController.login)

router.get('/all/user',userController.getAllUser)

module.exports = router