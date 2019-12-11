const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {  // ojo! cambio name por title
        type: String,
        required: true
    },
    // description: {
    //     type: String,
    //     required: false // cambio true por false porque no creo que sea necesario...
    // },
    unit:{
        type: String,
        required: true
    } 
})