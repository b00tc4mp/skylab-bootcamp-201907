const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose

module.exports = new Schema({
    year : {
        type : Date,
        required : true
    },
    shirt : {
        type : ObjectId,
        ref : 'Shirt'
    },
    activities : [{ ObjectId , ref: 'Activity' }],
    enrollments : [{ ObjectId , ref: 'Enrollment' }],
})