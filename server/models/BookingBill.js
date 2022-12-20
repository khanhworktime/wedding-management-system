const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingBillSchema = new Schema({
    for: {
      type: String
    },
    pay_date: {
       type: Date,
        default: Date.now()
    },
    price_per_table: {
       type: Number
    },
    amount: {
       type: Number
    },
    state: {
        type: String,
        enum: ['checked','unchecked']
    }
})
module.exports = mongoose.model('bookingBills', BookingBillSchema)