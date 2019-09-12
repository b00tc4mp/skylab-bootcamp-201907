const mongoose = require('mongoose')

let connection

function connect (url) {
    return connection ? connection : connection = mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
}
function disconnect() {
    connection = undefined

    return mongoose.disconnect()
}

module.exports =  { connect, disconnect }
