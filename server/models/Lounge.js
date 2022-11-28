const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoungeSchema = new Schema({
    price: {
        type: Number
    },
    description:{
        type: String
    },
    state:{
        type: String,
        enum: ['available','booked','using','unavailable']
    },
    capacity:{
        type: Number
    },
    name: {
        type: String
    }
})
module.exports = mongoose.model('lounges', LoungeSchema)