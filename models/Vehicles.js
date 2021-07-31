const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    platenumber: {
        type: String,
        required: true,
        unique: true
    },
    //we have to have this to know number of seats remaining. From this value we can subtract for every seat booked
    maxpassangers : {
        type: Number,
    },
    passangers: [{
        name: {type: String}
    }],
    depaturedate: {
        type: Date
    },
    time: {
        type: String
    },
    depature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    amount: {
        type: Number
    },
    seatsavailable: [{
        position: {type: Number},
        occupied: {type:Boolean, default: false}
    }]
})

const Vehicles = mongoose.model('Vehicles', vehicleSchema)
module.exports = Vehicles
