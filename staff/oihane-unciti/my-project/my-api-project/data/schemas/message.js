const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    date: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    
    author: { type: ObjectId, ref: 'User' }
})