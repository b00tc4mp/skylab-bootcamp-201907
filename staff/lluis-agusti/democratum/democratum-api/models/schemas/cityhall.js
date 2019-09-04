const mongoose = require('mongoose')
const { Schema } = mongoose
// const pollSchema = require('./poll') 

module.exports = new Schema({
    chName: {
        type: String,
        required: true
    },

    chAddress: {
        type: String,
        required: true
    },

    chEmail: {
        type: String,
        required: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    chImageId: {
        type: String, // link a CLOUDINARY? --> image uplad and... ??????
        required: true
    },

    chPassword: {
        type: String,
        required: true
    }
})
