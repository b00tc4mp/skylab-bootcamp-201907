const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    found: [{ 
        type: ObjectId, 
        ref: 'Cache' 
    }],
    favorites: [{
        type: ObjectId, 
        ref: 'Cache'
    }],
    owned: [{
        type: ObjectId, 
        ref: 'Cache'
    }],
    
})

module.exports = userSchema