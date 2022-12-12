const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingRecordSchema = new Schema({
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
    lounge: {
        type: Schema.Types.ObjectId,
        ref: 'lounges'
    },
    menu:{
        type: Schema.Types.ObjectId,
        ref: 'menus'
    },
    services:[{
        type: Schema.Types.ObjectId,
        ref: 'services'
    }],
    state: {
        type: String,
        enum: ["init", "confirmed", "processing", "finished", "cancel"]
    },
    wed_date: String,
    guest_amount: String,
    customer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookingContracts'
    },
    bill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookingBills'
    },
    deposite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bookingDeposits'
        }
    ]

})
module.exports = mongoose.model('bookingRecords', BookingRecordSchema)