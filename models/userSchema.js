const mongoose = require('mongoose')
const config = require('../config/config')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,

    },
    location: {
        type: String,
        required: true
    },
    dogName: {
        type: String,
        required: true
    },
    dogBreed: {
        type: String,
        required: true
    },
    dogAge: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: "the_pet_Whisperer@1237896"
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'trainer'],
        default: 'user'
    },
    leadFor: {
        type: String,
        enum: ['homeboarding', 'pet_training'],
        default: "pet_training"
    },
    leadType: {
        type: String,
        enum: ['contact', 'trail', 'postive', 'negative'],
        default: 'contact'
    },
    created_at: { type: Date, default: Date.now },
    isdisable: {
        type: Boolean,
        default:false
    }
},
    { timestamps: true }
)

// code to generated jwt token 

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, config.JWT, {
        expiresIn: '7d'
    })
}

module.exports = mongoose.model('User', userSchema)