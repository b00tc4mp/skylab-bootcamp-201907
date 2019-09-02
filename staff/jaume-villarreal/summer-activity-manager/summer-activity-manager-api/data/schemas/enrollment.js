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
    imageAuthorization : {
        type: boolean,
        required : true
    },
    excursionAuthorization : {
        type: boolean,
        required : true
    },
    shirt : {
        type: String,
        enum : ['4' , '6' , '8' , '10' , '12' , 'XS' , 'S' , 'M' , 'L' , 'XL'],
        ref : 'Shirt'
    },
    weeks : [weekSchema],
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
    }
})