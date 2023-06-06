const mongoose = require('mongoose');
const config = require('../config/config');


const detailSchema = new mongoose.Schema({
    leadReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainingDays: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    payment: {
        type: String
    },
    modeOfPayment: {
        type: String
    },
    paymentRecived: {
        type: String,
        enum: ['prepayment', 'postpayment', 'partialpayment', 'notrecived']
    },
    Amount: {
        type: String
    }
});

module.exports = mongoose.model('details', detailSchema)