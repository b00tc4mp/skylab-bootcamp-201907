const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const Mail = require('./mail')

module.exports = new Schema({
    users:  [{ type: ObjectId, ref: 'User' }],
    messages: [Mail]
})