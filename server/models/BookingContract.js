const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingContractSchema = new Schema({
    validate_number:{
        type: Number
    },
    contract_state:{
        type: String,
        enum: ['available','unavailable']
    }
})
module.exports = mongoose.model('bookingContracts', BookingContractSchema)