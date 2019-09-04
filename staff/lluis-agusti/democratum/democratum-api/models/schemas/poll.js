const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
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
        type: String, // link a CLOUDINARY? --> image uplad and... ??????
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

