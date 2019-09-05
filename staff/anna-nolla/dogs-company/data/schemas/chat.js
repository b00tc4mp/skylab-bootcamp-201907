const { Schema, ObjectId } = require('mongoose')
const Message = require('./message')

module.exports = new Schema({
    participants: [{ 
        type: ObjectId, 
        ref: 'User'
    }],
    messages: [Message],

    // delete:[{
    //     type: ObjectId,
    //     ref: 'User'
    // }]
})