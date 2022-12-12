const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartySchema = new Schema({
    state:{
        type: String,
        enum: ['available','unavailable']
    },
    record: {
        type: Schema.Types.ObjectId,
        ref: 'boookingRecords'
    },
    employees: {
        type: Schema.Types.ObjectId,
            ref: 'employees'
    }})
module.exports = mongoose.model('parties', PartySchema)