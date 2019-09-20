const { MongoClient } = require('mongodb')

function connectDB(url, dbName, collectionName) {
    let client, users

    client = new MongoClient(url)

    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                const db = client.db(dbName)
                users = db.collection(collectionName)
                resolve(users)
            })
            .catch(error => reject(error))
        })
}

module.exports = connectDB