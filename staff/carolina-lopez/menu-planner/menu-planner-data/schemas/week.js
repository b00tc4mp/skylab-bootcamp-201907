const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const Day = require('./day')

module.exports = new Schema({
    date: {
        type: Date,
        required: true
    },
    monday: Day,
    tuesday: Day,
    wednesday: Day,
    thursday: Day,
    friday: Day,
    saturday: Day,
    sunday: Day
})


