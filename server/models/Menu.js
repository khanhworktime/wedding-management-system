const mongoose = require('mongoose')
const Dish = require("./Dish")
const Schema = mongoose.Schema

const MenuSchema = new Schema({
    price:{
        type: Number
    },
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
    dishes: {
        type: [Dish]
    }
})
module.exports = mongoose.model('menus', MenuSchema)