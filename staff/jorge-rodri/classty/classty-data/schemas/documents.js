const mongoose = require('mongoose')
const { Schema , TypesSchema: { ObjectId } } = mongoose

module.exports = {
    title:{
        type: String,
    },
    subject: { type: ObjectId, ref: 'Subject'},
    type: ObjectId
}