const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingRecordSchema = new Schema({
    host: {
        bride: {
            name: String,
            birthday: String
        },
        groom: {
            name: String,
            birthday: String
        }
    },
    loungeId: String,
    menuId: String,
    services: Array,
    state: {
        type: String,
        enum: ["init", "confirmed", 'contract confirmed' , 'deposited' , 'paid' , "processing", "finished", "cancel"]
    },
    wed_date: String,
    shift: {
        type:String,
        enum: ['Sáng', 'Chiều']
    },
    guest_amount: Number,
    customerId : String,
    contractId: String,
    billId: String,
    deposites: [
        {
            _id: String
        }
    ],
    totalIn: Number,
    create_at: {
        type: Date,
        default: Date.now()
    }

})
module.exports = mongoose.model('bookingRecords', BookingRecordSchema)