const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    article: {
        type: ObjectId,
        required: true,
        ref: 'Article'
    },
    quantity:{
        type: Number,
        required:true
    }
})