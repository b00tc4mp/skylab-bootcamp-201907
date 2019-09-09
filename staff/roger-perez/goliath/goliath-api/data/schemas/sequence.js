const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema({
    beats: {
        type: [Boolean], 
        required: true},
    instrument: [{ type: ObjectId, ref: 'Instrument' }]


})