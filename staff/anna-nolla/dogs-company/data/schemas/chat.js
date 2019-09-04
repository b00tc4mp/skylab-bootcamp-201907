const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    participants: [{ 
        type: ObjectId, 
        ref: 'User'
    }],
    message: [{
        type: ObjectId,
        ref: 'message'
    }]
})