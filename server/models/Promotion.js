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
    lounges: [
        {
            type: Schema.Types.ObjectId,
            ref: 'lounges'
        }
    ],
    menus: [
        {
            type: Schema.Types.ObjectId,
            ref: 'menus'
        }
    ],
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'services'
        }
    ],

})
module.exports = mongoose.model('promotions', PromotionSchema)