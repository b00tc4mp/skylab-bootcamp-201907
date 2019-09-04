const mongoose = require('mongoose')
const Schema = mongoose

const photoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    }
    
})

module.exports = photoSchema