// importing the define schema and modules
const user = require('../models/userSchema')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const bcrypt = require('bcrypt')
const logger = require("../utlis/logger")
const { google } = require('googleapis')

// const nodemailer = require('nodemailer')

const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient();
    const sheets = google.sheets({
        version: 'v4',
        auth: client
    });
    return { sheets }
}

const id = "1Xz0Lk-00EXSJZXY2dqR_fZjpH-GhJP9lzFiZe5yAlYo"// spreadsheet 

//registring the user 

exports.registeruser = catchAsyncErrors(async (req, res) => {
    try {
        // validating the proper body
        const {
            Name, email, phone, location, dog_name, dog_breed, dog_age, message
        } = req.body
        // 


        // const finduser = await user.findOne({ phone: phone })
        // if (finduser) {
        //     res.status(400).json({
        //         success: false,
        //         message: "already messaged send ! will Contact in next 12 hours"
        //     })
        //     return
        // }
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

            const { sheets } = await authentication();
            const d = new Date();
            let date = d.toLocaleDateString();
            // writing data toaspreadsheet
            const writeReq = await sheets.spreadsheets.values.append({
                spreadsheetId: id,
                range: 'Sheet1',
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        [date, email, phone, location, dog_name, dog_breed, dog_age, message],
                    ]
                }
            })

            logger.info('User registered successfully');
            return res.status(200).json({
                success: true,
                message: "user register succesfully",
                data: createUser,
                sheet: writeReq
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
