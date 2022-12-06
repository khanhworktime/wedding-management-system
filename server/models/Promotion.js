const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PromotionSchema = new Schema({
    name: String,
    state: {
        type: String,
        enum: ['available','unavailable']
    },
    start_at:Date,
    end_at:Date,
    description: String,
    discount_value: Number,
    lounge_id :String,
    service_id:String,
    menu_id: String
})
module.exports = mongoose.model('promotions', PromotionSchema)