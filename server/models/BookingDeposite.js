const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingDepositeSchema = new Schema({
    amount : Number,
    deposite_state: String,
})
module.exports = mongoose.model('bookingDeposites', BookingDepositeSchema)