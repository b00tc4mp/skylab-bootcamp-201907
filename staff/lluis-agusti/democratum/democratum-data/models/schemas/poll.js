const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({

    cityId: {
        type: String,
        required: true
    },

    authorId: {
        type: String,
        required: true
    },
    
    question: {
        type: String,
        required: true
    },

    optionA: {
        type: String,
        required: true
    },

    optionB: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    imagePoll: {
        type: String,
        required: true
    },

    positives: {
        type: Number,
        required: false
    },

    negatives: {
        type: Number,
        required: false
    },

    pollStatus: {
        type: String,
        required: true,
        enum: ['pending', 'rejected', 'approved', 'expired'],
        default: 'pending'
    }

})