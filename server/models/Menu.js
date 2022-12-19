const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {dishSchema} = require('./Dish')

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
    soup: [{
        type: Schema.Types.Mixed,
        default: {}
    }],
    salad: [{
        type: Schema.Types.Mixed,
        default: {}
    }],
    main: [{
        type: Schema.Types.Mixed,
        default: {}
    }],
    dessert: [{
        type: Schema.Types.Mixed,
        default: {}
    }],
    other: [{
        type: Schema.Types.Mixed,
        default: {}
    }],
    promotion: {
        type: Schema.Types.ObjectId,
        ref: 'promotions'
    }
})
module.exports = mongoose.model('menus', MenuSchema)