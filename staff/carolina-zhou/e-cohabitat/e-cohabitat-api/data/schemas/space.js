const { Schema, ObjectId } = require('mongoose')


module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
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