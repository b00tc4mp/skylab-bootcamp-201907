require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { name, version } = require('./package')
const routes = require('./routes')


/* const schemes = require('./data/schemas')
const logic = require('./logic')
const data = require('./data') */

const { env: { PORT, DB_URL } } = process



mongoose.connect(DB_URL, {userNewUrlParser: true})
    .then(() => {

        const app = express()

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    mongoose.disconnect()

    process.exit(0)
})
