require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const { name, version } = require('./package')
const routes = require('./routes')

const { env: { PORT, DB_URL } } = process


mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
        






