const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    }
})