require('dotenv').config()
const express = require('express')
const data = require('./data')
const { name, version } = require('./package')
const logic = require('./logic')
const routes = require('./routes')

const { mongoose, models } = data

const { User } = models //models from moongose
const { env: { PORT, DB_URL } } = process

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logic.__users__ = User //moongose User model 

        const app = express()

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    mongoose.disconnect()

    process.exit(0)
})
