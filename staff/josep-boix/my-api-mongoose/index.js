require ('dotenv').config()

const express = require ('express')
const mongoose = require ('mongoose')
const routes = require ('./routes')
const {name, version} = require ('./package')

const { env: {PORT, DB_URL} } = process

mongoose.connect(DB_URL, {useNewUrlParser: true})
.then (() => {
    const app = express()

    app.use ( express.json () )
    app.use ( '/api', routes )
    app.listen ( PORT, () => console.log (`Welcome! ${name} ${version} up and running on PORT ${PORT}`))
})

process.on ('SIGINT', () => {       
// in case of signal interrumped
    console.log (`\nBye! ${name} ${version} shutting down, disconecting from db...`)

    mongoose.disconnect()

    process.exit(0)
})