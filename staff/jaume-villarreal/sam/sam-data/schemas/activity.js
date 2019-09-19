const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    } 
})