const mongoose = require('mongoose')
const instrument = require('./instrument')

const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema({
    beats: {
        type: [Boolean], 
        required: true
    },
    
    // instrument: [{ type: ObjectId, ref: 'Instrument' }]
    instrument: [instrument]

})