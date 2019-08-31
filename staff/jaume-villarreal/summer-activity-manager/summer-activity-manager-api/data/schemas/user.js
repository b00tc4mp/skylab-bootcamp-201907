const mongoose = require('mongoose')
const { Schema , Schema : {Types : { ObjectId } } } = mongoose 
const weekSchema = require('./week')


module.exports = new Schema({
    name : {
        type: String,
        required : true
    },
    surname : {
        type: String,
        required : true
    },
    birthdate : {
        type: Date,
        required : true
    },
    school : {
        type: String,
        required : true
    },
    group : {
        type: String,
        required : true
    },
    healthcard : {
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
    shirtRef : {
        type: ObjectId,
        ref : 'Shirt'
    },
    activityRef : {
        type: ObjectId,
        ref : 'Activity'
    },
    guardianRef : {
        type: ObjectId,
        ref : 'Guardian'
    },
    weeks : [weekSchema]
})