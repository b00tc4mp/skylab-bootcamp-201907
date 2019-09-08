const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

module.exports = new Schema({
    
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }

})