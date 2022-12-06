const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {DishSchema} = require('./Dish')

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
    soup: {
        type: [DishSchema]
    },
    salad: {
        type: [DishSchema]
    },
    main: {
        type: [DishSchema]
    },
    dessert: {
        type: [DishSchema]
    },
    other: {
        type: [DishSchema]
    }
})
module.exports = mongoose.model('menus', MenuSchema)