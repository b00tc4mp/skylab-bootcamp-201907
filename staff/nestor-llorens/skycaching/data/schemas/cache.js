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

    lat: {
        type: Number,
        required: true
    },

    lon: {
        type: Number,
        required: true
    },

    difficulty: {
        type: Number,
        required: true,
        enum: [1,2,3],
        default: 1
    },

    terrain: {
        type: Number,
        required: true,
        enum: [1,2,3],
        default: 1
    },

    size: {
        type: String,
        required: true,
        enum: ['small', 'medium', 'big'],
        default: 'small'
    },

    hints: {
        type: String,
    },

    owner: {
        type: ObjectId, 
        ref: 'User'
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },

    
    photos: [Photo]
    ,
    comments: [Comment]
    
})

module.exports = cacheSchema