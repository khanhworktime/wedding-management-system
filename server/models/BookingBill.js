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
    total_dish: {
       type: Number
    },
    total_service: {
       type: Number
    },
    total: {
       type: Number
    },
    deposite_id: {
       type: String
    },
    create_at: {
       type: String
    },
    create_by: {
       type: String
    },
    bill_state: {
        type: String,
        enum: ['paid','Unpaid']
    },
    discount_for_lounge: {
       type: Number
    },
    booking_service_fee :{
       type: String
    }
})
module.exports = mongoose.model('bookingBills', BookingBillSchema)