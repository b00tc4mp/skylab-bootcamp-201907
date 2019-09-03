const mongoose = require('mongoose')
const { Schema , Schema : {Types : { ObjectId } } } = mongoose 
const weekSchema = require('./week')


module.exports = new Schema({
    school : {
        type: String,
        required : true
    },
    group : {
        type: String,
        required : true
    },
    shirt : {
        type: String,
        enum : ['4' , '6' , '8' , '10' , '12' , 'XS' , 'S' , 'M' , 'L' , 'XL'],
        ref : 'Shirt'
    },
    allergy : {
        type: String,
        required : true
    },
    illness : {
        type: String,
        required : true
    },
    medication : {
        type: String,
        required : true
    },
    observations : {
        type: String,
        required : true
    },
    imageAuth : {
        type: boolean,
        required : true
    },
    excursionAuth : {
        type: boolean,
        required : true
    },
    activity : {
        type: ObjectId,
        ref : 'Activity'
    },
    tutor : {
        type: ObjectId,
        ref : 'Tutor'
    },
    student : {
        type: ObjectId,
        ref : 'Student'
    },
    weeks : [weekSchema]
})