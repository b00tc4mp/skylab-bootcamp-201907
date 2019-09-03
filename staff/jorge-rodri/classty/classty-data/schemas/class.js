const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

 module.exports = new Schema({
     mentor: { type: ObjectId, ref: 'User'},
     subjects: [ { type: ObjectId, ref: 'Subject'} ],
     teachers: [ { type: ObjectId, ref: 'User', required: true} ],
     students: [ { type: ObjectId, ref: 'User' } ]
 })