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
    },
    order: {
        type: String,
        enum: ['Soup','Salad','Món chính','Tráng miệng','Đồ uống','Khác']
    },
    type: {
        type: String,
        enum: ['Món mặn','Món chay','Đồ ngọt','Lẩu','Khác']
    }

})
exports.DishSchema = DishSchema
module.exports = mongoose.model('dishes', DishSchema)