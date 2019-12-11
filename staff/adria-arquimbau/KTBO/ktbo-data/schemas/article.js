const { Schema } = require('mongoose')

module.exports = new Schema({
    ref: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['KTTape Pro Precut', 'KTTape Pro Uncut', 'KTTape Pro Limited Edition', 'KTTape Pro Jumbo Precut', 'KTTape Pro Jumbo Uncut', 'KTTape Original Precut', 'KTTape Original Uncut', 'KTTape Original Jumbo Precut', 'KTTape Original Jumbo Uncut', 'KTTape Original Jumbo Edema', 'Other Products']
    },
    price: {
        type: Number,
        required: true,
    }
})