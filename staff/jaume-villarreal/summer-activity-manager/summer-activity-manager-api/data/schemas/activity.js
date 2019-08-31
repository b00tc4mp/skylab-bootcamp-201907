const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose

module.exports = new Schema({
    name : {
        type : String,
        required : true
    },
    users : [{ type: ObjectId , ref : 'Users' }]
})