// importing the define schema and modules
const user = require('../models/userSchema')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const bcrypt = require('bcrypt')
const logger = require("../utlis/logger")

const twilio = require('twilio');
const config = require('../config/config');
const detailSchema = require('../models/detailSchema');

//registring the user 

exports.registeruser = catchAsyncErrors(async (req, res) => {
    try {
        console.log(req.body)
        // validating the proper body
        const {
            Name, email, phone, location, dogName, dogBreed, dogAge, message, role, password, leadFor, leadType, isdisable
        } = req.body
        // twillo
        const accountSid = 'AC251f9256e0c54578448744c115236915';
        const authToken = "b5f7714b619d78068f202111b53abd20";
        // const client = twilio(accountSid, authToken);


        const client = twilio(accountSid, authToken);
        // console.log(client,'client')

        const finduser = await user.findOne({ phone: phone })
        if (finduser) {
            res.status(400).json({
                success: false,
                message: "already messaged send ! will Contact in next 12 hours"
            })
            return
        }
        const createUser = await user.create({
            Name, email, phone, location, dogName, dogBreed, dogAge, message, role, password, leadFor, leadType, isdisable
        })

        if (!createUser) {
            res.status(400).json({
                success: false,
                message: 'cannot create user',
            })
        }

        if (createUser) {
            const salt = await bcrypt.genSalt(10);
            createUser.password = await bcrypt.hash(createUser.password, salt);
            await createUser.save()


            logger.info('User registered successfully');
            // 
            const customerMessage = `
            Greeting From Pet Whisperer 
Thank you for contacting.
We will contact you soon in next 24 hours.`;
            client.messages.create({
                body: customerMessage,
                from: "+13029244725",
                to: `+91${phone}` // The customer's phone number
            })
                .then(message => console.log('Message sent to the customer:', message.sid))
                .catch(error => console.log('Error sending message to the customer:', error));

            // Send message to the admin
            const adminMessage = `Hi The Pet Whisperer
Hurry ! New Inquiry
Name: ${Name}
Email: ${email}
Phone: ${phone}
Location: ${location}
Dog Name: ${dogName}
Dog Breed: ${dogBreed}
Dog Age: ${dogAge}
Message: ${message}`;
            client.messages.create({
                body: adminMessage,
                from: "+13029244725",
                to: "+918108837503" // The admin's phone number
            })
                .then(message => console.log('Message sent to the admin:', message.sid))
                .catch(error => console.log('Error sending message to the admin:', error));
            // 
            return res.status(200).json({
                success: true,
                message: "user register succesfully",
                data: createUser,

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

exports.login = catchAsyncErrors(async (req, res) => {
    try {
        const { email, password } = req.body

        const finduser = await user.find({ email: req.body.email })
        console.log(finduser, '68')
        if (!finduser[0] && !phone) {
            res.status(400).json({
                success: false,
                message: "Incorrect credential",
            });
            return
        }

        if (!finduser[0] && !email) {
            res.status(400).json({
                success: false,
                message: "Incorrect credential",
            });
            return
        }
        let passwordData
        let data1
        finduser && finduser.map((i) => {
            passwordData = i.password
            data1 = i
        })
        const token = data1.getJwtToken()
        console.log(token, "token")
        if (finduser) {
            let ismatch = await bcrypt.compare(password, passwordData)
            // let ismatch = finduser.comparePassword(password)
            console.log(ismatch, "ismatch")
            if (!ismatch) {
                res.status(400).json({
                    success: false,
                    message: "Incorrect Password",
                });
                return
            }
            if (ismatch) {
                data1.token = token
                const token1 = Object.assign(data1, { token })
                if (token1) {
                    logger.info('User logged in successfully');
                    res.status(200).json({
                        success: true,
                        message: "Login succesfully ",
                        data: data1,
                        // userRole: userRoleData,
                        token: token
                    });
                    return
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Login Unsuccesfully ",
                    });
                }
            }

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error
        })
    }
})

exports.getAllUser = catchAsyncErrors(async (req, res) => {
    try {
        const allUser = await user.find()
        if (!allUser) {
            res.status(400).json({
                message: "Not able to find user!"
            })
            return
        }
        if (allUser) {
            res.status(200).json({
                message: "user found",
                count: allUser.length,
                data: allUser
            })
            return
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error
        })
    }
})

exports.updateUser = catchAsyncErrors(async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await user.findByIdAndUpdate(userId, updatedData, {
            new: true, // To return the updated user
            runValidators: true, // To run validators on the updated data
        });

        if (!updatedUser) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        // Check if lead is positive
        if (updatedUser.leadType === "positive") {
            // Create detail schema
            const newDetail = await detailSchema.create(updatedData);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: { updatedUser, newDetail },
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: error,
        });
    }
});
