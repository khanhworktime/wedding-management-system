const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
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
    role: {
        type: String,
        enum: ['customer','admin', 'sale', 'accountant', 'controller', 'chef']
    },
    accessToken: {
        type: String
    },
    email: String,
    gender: String,
    party_ordered: Number
})

module.exports = mongoose.model('users', UserSchema)