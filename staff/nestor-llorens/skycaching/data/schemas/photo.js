const { Schema } = require('mongoose')

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