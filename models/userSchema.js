const mongoose = require('mongoose')
const config = require('../config/config')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    dog_name: {
        type: String,
        required: true
    },
    dog_breed: {
        type: String,
        required: true
    },
    dog_age: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

// code to generated jwt token 

// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, config.JWT, {
//         expiresIn: '7d'
//     })
// }

module.exports = mongoose.model('User', userSchema)