// en index general antes utilizabamos rutas, ahora hacemos connexion general para utilizar en folder routes.

// node . 8000: terminal visual
//terminal general: db.users.find().pretty()
// use my-api


require('dotenv').config()


const express = require('express')
const data = require('./data') //connection client
const { name, version } = require('./package') // traer las variables de .env
const logic = require('./logic')
const routes = require('./routes')

const {env: { PORT, DB_URL, DB_NAME } } = process

let client


data(DB_URL, DB_NAME)
    .then(({ client: _client, db }) => {
        client = _client

        const users = db.collection('users')

        logic.__users__ = users

        const app = express()

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    client.close()

    process.exit(0)
})
