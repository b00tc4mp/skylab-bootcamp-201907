const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
// const Item from './item'
const Item = require ('./item')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    items: [Item],
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'snack', 'dinner']
    }
})