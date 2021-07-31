const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
   state: {
    type: String,
    required: true
   },
   address: {
       type: String
   }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location