require('dotenv').config()

const express = require('express')
const data = require('./data')
const { name, version } = require('./package')
const logic = require('./logic')
const routes = require('./routes')

const { mongoose, models } = data

const { User } = models 
const { env: { PORT } } = process

mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logic.__users__ = User 

        const app = express()

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    mongoose.disconnect()

    process.exit(0)
})
