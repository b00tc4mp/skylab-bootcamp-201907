const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
   
    users:  [{ type: ObjectId, ref: 'User' }],
    messages: [Message]
})