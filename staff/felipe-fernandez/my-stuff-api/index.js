require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const { env: { URL_DB, PORT } } = process

mongoose.connect(URL_DB, {useNewUrlParser: true})
.then(()=>{

    const app = express()

    app.use('/api', routes)
    
    app.listen(PORT, () => {
       console.log('app listening on port 8080')
    })
    

})

process.on('SIGNINT', ()=>{
    console.log('server disconnected')
    mongoose.disconnect()
    process.exit(0)
})




