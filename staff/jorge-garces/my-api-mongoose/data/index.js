

let connection

module.exports = function (url, database) {
    if (!connection) connection = mongoose.connect(`${url}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true })

    return connection
}