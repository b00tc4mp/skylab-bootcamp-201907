const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const itemSchema = require('./item') 



module.exports = new Schema({
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true
    },

    owners: { type: ObjectId,
         ref: 'User'
    }, // per referencia schema

    items: [itemSchema] //array de items
})
