const { Schema } = require('mongoose')

module.exports = new Schema({
    number: {
        type: Number,
        require: true
    },

    expiry: {
        type: Date,
        require: true
    }
})