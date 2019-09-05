require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const { name, version } = require('./package')
const routes = require('./routes')
/* var cors = require('cors')
 */
const { env: { PORT, DB_URL } } = process


mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })


    .then(() => {

        const app = express() 
        // CONNECTION TO PASS CORS
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next()
        }) 
/*         app.use(cors())
 */    
        app.use('/skyshop', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)) 
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    mongoose.disconnect()
    
    process.exit(0)
})
        






