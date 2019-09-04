const mongoose = require('mongoose')
const Schema = mongoose
const Photo = require('./photo')
const Activity = require('./activity')


const cacheSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },

    location: {
        lan: Number,
        lng: Number,
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
    comments: [Activity]
    
})

module.exports = cacheSchema