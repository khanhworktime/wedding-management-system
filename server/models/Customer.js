const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    userinfo: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    party_ordered: {
        type: Number
    }
})

module.exports = mongoose.model('customers', CustomerSchema)