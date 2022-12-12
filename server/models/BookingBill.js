const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingBillSchema = new Schema({
    pay_date: {
       type: Date
    },
    price_per_table: {
       type: Number
    },
    booking_price: {
       type: Number
    },
    deposite: {
       type: Schema.Types.ObjectId,
        ref: 'bookingDeposites'
    },
    create_at: {
       type: String
    },
    create_by: {
       type: Schema.Types.ObjectId,
        ref: 'users'
    },
    bill_state: {
        type: String,
        enum: ['paid','unpaid']
    },
    discount_for_lounge: {
       type: Number
    },
    booking_service_fee :{
       type: Number
    }
})
module.exports = mongoose.model('bookingBills', BookingBillSchema)