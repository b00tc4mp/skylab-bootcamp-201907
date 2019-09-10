const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    category : {
        type : String,
        enum : ['part' , 'full'],
        required : true
    },
    morningPermanence : {
        type : booelean,
        required : true
    },
    afternooonPermanence : {
        type : booelean,
        required : true
    },
    lunch : {
        type : boolean,
        required : true
    }
})