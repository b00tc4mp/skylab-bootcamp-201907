const express = require ('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const logic = ('./logic')

const client = new MongoClient("mongodb://localhost" , { useNewUrlParser : true , useUnifiedTopology : true })
const secret = 'myAppCSecret'

client.connect()
    .then( () => {
        const db = client.db('my-app')
        const users = db.collection('users')
        const logic.__users__ = users
        const port = { argsv : [ , , port=8080] } = process
        const app = express()
        const jsonBodyParser = bodyParser.json()

        app.post('/user' , jsonBodyParser , (req , res) => {
            const { body : {name , surname , email , password} } = req

            try{
                logic.registerUser( name , surname , email , password)
                    .then( () => res.status(201).json({ message : "user registered correctly"}))
                    .catch({ message } => res.status(400).json({ error : message }))
            } catch({ message }){
                res.status(400).json(error:message)
            }
        })
    
        app.listen(port)
    })


