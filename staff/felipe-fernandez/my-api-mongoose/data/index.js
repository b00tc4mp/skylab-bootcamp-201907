// const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')


let connection

module.exports = function(url, database){
   // if(!connection){
        // const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
        if(!connection) connection =  mongoose.connect((url, {useNewUrlParser: true, useUnifiedTopology: true}))

    //     connection = client.connect()
    //         .then(()=> {
    //             const db = client.db(database)
    //             return {client, db}
    //         })
    // }

   return connection
}
