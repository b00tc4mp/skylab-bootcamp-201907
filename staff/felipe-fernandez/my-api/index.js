const express = require('express')
const logic = require('./logic')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')


// const client = new Mongoclient('mongodb://localhost' , { useNewUrlParser: true, useUnifiedTopology: true})
const client = new MongoClient('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true })
const secret = 'bootcamp malo rulez'

client.connect()
.then(()=>{

    //Database
    const db = client.db('my-api')
    const users = db.collection('users')
    logic.__users__= users

    //Express
    const {argv: [, , port=8080]} = process
    
    const app = express()
    
    const jsonBodyParser = bodyParser.json()
    
    app.post('/user', jsonBodyParser, (req, res)=> {
        const {body:{name, surname, email, password}} =req
    
        try  {
            logic.registerUser(name, surname, email, password)
            .then (() => res.status(201).json({message : 'User registered correctly'}) )
            .catch(( {message}) => res.status(400).json({error: message}) )}
        catch ({message}){
            res.status(400).json({error:message})
        }
       
    })

    app.post('/auth', jsonBodyParser, (req, res)=>{
        const {body: {email, password}} =req

        try {
            logic.authenticateUser(email, password)
             .then(id => {
                 const token = jwt.sign({sub: id}, secret,  {expiresIn: '1h'})
                 res.json({message: 'User authenticated successfully', id, token })

             })
             .catch(({message}) => res.status(401).json({error: message}))

        } catch ({message}){
            res.status(401).json({error: message})
        }
    })

    app.get('/user/:id', (req, res) =>{

        const {params : {id}, headers: {authorization}}= req

        const token = authorization.slice(authorization.indexOf(' ') +1)

        try {
            jwt.verify(token, secret)

            logic.retrieveUser(id)
             .then(user => res.json({message:'user retrieved correctly' ,user}))
             .catch(({message})=> res.status(404).json({error:message}))

        } catch({message}){
            res.status(404).json({error:message})

        }
    })

    app.delete('/user/:id', jsonBodyParser, (req, res) =>{

        const {params:{id}, headers: {authorization}, body:{email, password}} = req

        const token = authorization.slice(authorization.indexOf(' ') +1)

        try{
            jwt.verify(token, secret)
            logic.unregisterUser(id, email, password)
             .then(() => res.json({message: 'user uregistered correctly'}))
             .catch(({message})=> res.status(404).json({error:message}))

        }catch({message}){
            res.status(404).json({error:message})

        }

    })


    app.put('/user/:id', jsonBodyParser, (req, res) => {
        const { params: { id }, headers: { authorization }, body } = req
        const token = authorization.slice(authorization.indexOf(' ') + 1)
        try {
            jwt.verify(token, secret)
            logic.updateUser(id, body)
                .then(() => res.json({ message: 'User modified successfully' }))
                .catch(({ message }) => res.status(400).json({ error: message }))
        } catch ({ message }) {
            res.status(404).json({ error: message })
        }
    })
    app.listen(port, ()=> console.log("server running"))
        
    })

    process.on('SIGINT', () => {
        console.log("shutting down server")
        client.close()
        process.exit(0)
    })
