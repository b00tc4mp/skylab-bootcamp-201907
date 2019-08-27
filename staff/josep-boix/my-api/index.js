require ('dotenv').config()

const express = require ('express')
const data = require ('./data')
const logic = require ('./logic')
const routes = require ('./routes')
const {name, version} = require ('./package')

const { env: {PORT, DB_URL, DB_NAME} } = process

let client

data(DB_URL, DB_NAME)
    .then( connection  => {
        const { client: _client, db } = connection
        client = _client

        const users = db.collection('users')

        logic.__users__ = users

        const app = express()

        app.use ('/api', routes)

        app.listen (PORT, () => console.log (`Welcome! ${name} ${version} now is up and running on port ${PORT}`))
    })

process.on ('SIGINT', () => {       
// in case of signal interrumped
    console.log (`\n ${name} ${version} shutting down, disconecting from db...`)

    client.close()

    process.exit(0)
})