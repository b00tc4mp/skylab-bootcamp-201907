require('dotenv').config()

const express = require('express')
const logic = require('./logic')
const data = require('./data')
const routes = require('./routes')
const { name , version } = require('package')

const { env : { PORT , DB_URL , DB_NAME }} = process

let client

data(DB_URL , DB_NAME)
    then( ({ client:_client , db }) => {
        client = _client

        const users = db.collection('users')

        logic.__users__ = users

        const app = express()

        app.use('/api'  routes)

        app.lsiten(PORT , () => console.log(`${name} ${version} up in port ${PORT}`))
    })

    process.on('SIGINT' , () => {
        console.log(`\n${name} ${version} shutting down, disconnecting from db...`)
        client.close()
        process.exit(0)
    })