require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const { name, version } = require('./package')
const routes = require('./routes')

const { env: { PORT, DB_URL } } = process

let client

mongoose.connect(DB_URL, { useNewUrlParser: true })
.then(() => {

    const app = express()
    app.use(express.json())

    app.use('/api', routes)

    app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
})

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    client.close()

    process.exit(0)
})
