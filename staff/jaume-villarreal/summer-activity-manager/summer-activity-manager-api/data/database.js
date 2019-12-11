
const mongoose = require('mongoose')

let connection

module.exports = {
    connect(url){
        return connection ? connection : mongoose.connect(url , {useNewUrlParser : true , useUnifiedTopology : true})
    },
    disconnect(){
        connection = undefined
        return mongoose.disconnect
    }
}