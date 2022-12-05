const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    birthday: {
        type: Date
    },
    identify_number: {
        type: String
    },
    state:{
        type: String,
        enum: ['available','unavailable']
    },
    party_ordered: {
        type: Number
    }
})

module.exports = mongoose.model('customers', CustomerSchema)