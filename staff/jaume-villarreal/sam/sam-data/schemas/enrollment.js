const mongoose = require('mongoose')
const { Schema , Schema : {Types : { ObjectId } } } = mongoose 
const weekSchema = require('./week')


module.exports = new Schema({
    year:{
        type: Number,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    shirt: {
        type: String,
        enum: ['4' , '6' , '8' , '10' , '12' , 'XS' , 'S' , 'M' , 'L' , 'XL'],
        ref: 'Shirt',
        required: true
    },
    allergy: {
        type: String,
    },
    illness: {
        type: String,
    },
    medication: {
        type: String,
    },
    observations: {
        type: String,
    },
    imageAuth: {
        type: Boolean,
        required: true
    },
    excursionAuth: {
        type: Boolean,
        required: true
    },
    activity: {
        type: ObjectId,
        ref: 'Activity'
    },
    student: {
        type: ObjectId,
        ref: 'Student',
        required: true
    },
    weeks: [weekSchema]
})