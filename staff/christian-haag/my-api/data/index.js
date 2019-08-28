const mongoose = require('mongoose')

module.exports = function (url, database) {

    const client = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    connection = client.connect()
        .then(() => {
            const db = client.db(database)

            return { client, db }
        })
}

return connection
