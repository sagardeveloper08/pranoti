// importing the define schema and modules
const user = require('../models/userSchema')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const bcrypt = require('bcrypt')
const logger = require("../utlis/logger")

//registring the user 
exports.registeruser = catchAsyncErrors(async (req, res) => {
    try {
        // validating the proper body
        const {
            Name, email, phone, location, dog_name, dog_breed, dog_age, message
        } = req.body

        const finduser = await user.findOne({ email: email, phone: phone })
        if (finduser) {
            res.status(400).json({
                success: false,
                message: "we have recived your message already will contact soon"
            })
            return
        }
        const createUser = await user.create({
            Name, email, phone, location, dog_name, dog_breed, dog_age, message
        })

        if (!createUser) {
            res.status(400).json({
                success: false,
                message: 'cannot create user',
            })
        }

        if (createUser) {


            await createUser.save()
            logger.info('User registered successfully');
            return res.status(200).json({
                success: true,
                message: "user register succesfully",
                data: createUser,
                token: token
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            success: false,
            message: "validation failled in catch",
        });
    }
})
