const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose

module.exports = new Schema({
    name : {
        type : String,
        required : true
    },
    surname : {
        type : String,
        required : true
    },
    dni : {
        type : String,
        required : true
    },
    acreditation : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    profile : {
        type : String,
        required : true
    },
    activity : {
        type : ObjectId,
        required : 'Activity'
    }
})