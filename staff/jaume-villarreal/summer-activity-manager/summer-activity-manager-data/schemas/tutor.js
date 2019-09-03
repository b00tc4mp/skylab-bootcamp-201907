const mongoose = require('mongoose')
const { Schema , Schema : {Types : {ObjectId} } } = mongoose

const guardianSchema = ({
    name : {
        type: String,
        required: true
    },
    surname : {
        type: String,
        required: true
    },
    dni : {
        type: String,
        required: true
    },
    phone1 : {
        type: String,
        required: true
    },
    phone2 : {
        type: String
    },
    email : {
        type: String,
        required: true
    },
    student : {
        type: ObjectId,
        ref : 'Student'
    }
})