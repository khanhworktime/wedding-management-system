const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DishSchema = new Schema({
    description:{
        type: String
    },
    state:{
        type: String,
        enum: ['available','unavailable']
    },
    name: {
        type: String
    },
    price: {
        type: Number
    }


})
module.exports = mongoose.model('dishes', DishSchema)