const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
    },
    address: {
        type: String,
        required: true
    },
    passcode: {
        type: String,
        required: true
    },
    cousers: [{ type: ObjectId, ref: 'User' }]
})