const { MongoClient } = require('mongodb')

let connection

module.exports = function (url, database) {
  if(!connection) {
    const client = new MongoClient(url, {
      useNewUrlParser: true, useUnifiedTopology: true})

      connection = client.connect()
        .then(() => {
          const db = client.db(database)

          return { client, db }
        })
    }
    return connection
}
