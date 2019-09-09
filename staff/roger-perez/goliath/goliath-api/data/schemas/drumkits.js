const mongoose = require('mongoose')
const sequence = require('./sequence')

const { Schema, Schema: { Types: { ObjectId } } } = mongoose


module.exports = new Schema({
    drumkitName: {
        type: String,
        required: true
    },
    sequences: [sequence],
    creator: [{ type: ObjectId, ref: 'User' }]
})
