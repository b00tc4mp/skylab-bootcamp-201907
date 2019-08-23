require('dotenv').config()

const express = require('express')
const data = require('./data')
const { name, version } = require('./package')
const logic = require('./logic')
const routes = require('./routes')

const { env: { PORT, DB_URL, DB_NAME } } = process

let client

data(DB_URL, DB_NAME)
    .then(({ client: _client, db }) => {
        client = _client
        const users = db.collection('users') // creamos la colección en mongo
        logic.__users__ = users // asignamos la colección a la lógica
        const app = express()
        app.use('/api', routes)
        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    client.close()

    process.exit(0)
})