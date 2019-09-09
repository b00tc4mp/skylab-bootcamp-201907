const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    date: {
        type: Date,
        required:true
    },
    from: { 
        type: ObjectId, 
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
})