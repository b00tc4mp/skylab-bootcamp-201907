require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {name, version} = require('./package')
const routes = require('./routes')

const {env :{ PORT, DB_URL}} = process
// const client = new Mongoclient('mongodb://localhost' , { useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connect(DB_URL, { useNewUrlParser: true})
    .then(() => {
    
    // const {client: _client, db} = connection
    
    // //Database
    // client = _client
    // const users = db.collection('users')
    // logic.__users__= users

    const app = express()

    app.use('/api', routes)

    app.listen(PORT, ()=> console.log(`${name} ${version} up and running on port ${PORT})`))
    
    })
   

    process.on('SIGINT', () => {
        console.log(`\n${name} ${version}shutting down server`)
        mongoose.disconnect()
        process.exit(0)
    })
