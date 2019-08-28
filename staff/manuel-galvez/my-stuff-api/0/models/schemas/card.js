const { Schema } = require('mongoose')

module.exports = new Schema({
    number: {
        type: String,
        require: true
    },

    expiry: {
        type: Date,
        require: true
    }
})
