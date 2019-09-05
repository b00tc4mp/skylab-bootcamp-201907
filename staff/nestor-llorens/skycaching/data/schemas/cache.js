const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const Photo = require('./photo')
const Comment = require('./comment')


const cacheSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    lan: {
        type: Number,
        required: true
    },

    lon: {
        type: Number,
        required: true
    },

    difficulty: {
        type: Number,
        required: true
    },

    terrain: {
        type: Number,
        required: true
    },

    size: {
        type: Number,
        required: true
    },

    hints: {
        type: String,
    },

    owner: {
        type: ObjectId, 
        ref: 'User'
    },
    
    photos: [Photo]
    ,
    comments: [Comment]
    
})

module.exports = cacheSchema