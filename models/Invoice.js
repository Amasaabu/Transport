const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'NOT PAID',
        validator(value) {
            if (value !== 'paid' && value !== 'not_paid') {
                throw new Error('Invalid payment status')
            }
        }
    },
    name: {
        type: String
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles'
    },
    email: {type: String},
    phonenumber: {type: Number},
    nextofKin: {
        type: String
    },
    nextofkinphonenumber: {
        type: Number
    },
    paymentmethod: {
        type: String,
        default: 'Credit Card'
    },
    dateofpayment: {
        type: String
    },
    amountpaid: {
        type: Number,
        default: 0
    },
    amounttobepaid: {
        type: Number
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    seatsposition: [{seat_id: {type: mongoose.Schema.Types.ObjectId}, position: {type: Number}}]
})



const Invoice = mongoose.model('Invoice', InvoiceSchema)
module.exports = Invoice