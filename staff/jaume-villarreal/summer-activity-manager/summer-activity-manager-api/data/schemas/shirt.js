const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose

module.exports = new Schema({
    size : {
        type: String,
        // enum : []
        required : true
    },
    users : [{ type : ObjectId , ref : 'User' }]   
})