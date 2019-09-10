require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
// const data = require('./data')
const { name, version } = require('./package')
// const logic = require('./logic')
const routes = require('./routes')

const { env: { PORT, DB_URL } } = process

//let client
/* data(DB_URL, DB_NAME)
    .then(({ client: _client, db }) => {
        client = _client

        const users = db.collection('users')

        logic.__users__ = users

        const app = express()

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    }) */

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        const app = express()

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    // client.close()
    mongoose.disconnect()

    process.exit(0)
})
