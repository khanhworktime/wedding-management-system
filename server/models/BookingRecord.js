const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingRecordSchema = new Schema({
    customer: {
        id: String,
        name: String,
        phone_number: String,
        email: String
    },
    host: {
        brides: {
            name: String,
            born_date: String
        },
        groom: {
            name: String,
            born_date: String
        }
    },
    lounge: String,
    wed_date: String,
    guest_amount: String
})
module.exports = mongoose.model('bookingRecords', BookingRecordSchema)