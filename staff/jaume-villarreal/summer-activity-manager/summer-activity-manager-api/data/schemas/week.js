const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    morningPermanence : {
        type : booelean,
        required : true
    },
    afternooonPermanence : {
        type : booelean,
        required : true
    },
    category : {
        type : String,
        enum : ['part' , 'full'],
        required : true
    },
    lunch : {
        type : boolean,
        required : true
    }
})