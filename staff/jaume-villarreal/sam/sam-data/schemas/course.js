const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose

module.exports = new Schema({
    year: {
        type: Number,
        required: true
    },
    shirt: {
        type: String,
        required: true
    },
    admins: [{ type: ObjectId , ref: 'Admin' }],
    activities: [{ type: ObjectId , ref: 'Activity' }],
    enrollments: [{ type: ObjectId , ref: 'Enrollment' }],
})