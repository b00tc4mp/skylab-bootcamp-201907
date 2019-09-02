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
    accreditation : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    activity : {
        type : ObjectId,
        ref : 'Activity'
    }
})