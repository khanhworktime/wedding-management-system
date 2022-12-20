const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingDepositeSchema = new Schema({
    for: String,
    amount : Number,
    pay_method : String,
    content: String,
    create_at : {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('bookingDeposites', BookingDepositeSchema)