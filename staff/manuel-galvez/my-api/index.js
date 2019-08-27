require('dotenv').config()

const express = require('express')
const logic = require('./logic')
const data = require('./data')
const { name, version } = require('./package')
const routes = require('./routes')

const { env: { PORT, DB_URL, DB_NAME } } = process

let client

data(DB_URL, DB_NAME)
    .then(connection => {
        const { client: _client, db } = connection
        client = _client

        const users = db.collection('users')

        logic.__users__ = users

        const app = express()

        // Middleware to manage routes
        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)) 
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    client.close()
    
    process.exit(0)
})
        






