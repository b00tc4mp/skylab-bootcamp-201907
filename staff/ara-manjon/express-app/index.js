const express = require('express')
debugger
const {argv:[,, port]}= process
const app = express()


app.get('/', (red, req)=>{
    
    res.send(`<form action="/search">
    <input></input>
    `)

})