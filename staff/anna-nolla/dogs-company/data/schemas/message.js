const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    date: {
        type: Date,
        required:true
    },
    from: { 
        type: String, 
        required: true
    },
    text: {
        type: String,
        required: true
    }
})