const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    price: {
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
    type: {
        type:String,
        enum: ["party_setup" , "audition" , "invitation" , "clothes" , "makeup" , "video_shot" , "controller" , "others"]
    },
    promotion: {
        type: Schema.Types.ObjectId,
        ref: 'promotions'
    }
})
module.exports = mongoose.model('services', ServiceSchema)