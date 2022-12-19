const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingContractSchema = new Schema({
    validate_number:{
        type: String
    },
    contract_state:{
        type: String,
        enum: ['init', 'confirmed' , 'cancel']
    },
    create_at: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('bookingContracts', BookingContractSchema)